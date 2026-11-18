import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const getToday = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

const timeSlots = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM",
  "01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM",
  "04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM",
  "07:00 PM","07:30 PM","08:00 PM","08:30 PM","09:00 PM","09:30 PM","10:00 PM"
];

const initialForm = {
  name: "", phone: "", email: "", reservationDate: getToday(),
  reservationTime: "07:00 PM", guests: "2", specialRequest: ""
};

const toMinutes = (time) => {
  const [clock, meridiem] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const TableReservation = () => {
  const { axios, user, navigate } = useAppContext();
  const [form, setForm] = useState({ ...initialForm, name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  const availableTimes = useMemo(() => {
    const today = getToday();
    if (form.reservationDate !== today) return timeSlots;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return timeSlots.filter((time) => toMinutes(time) > currentMinutes);
  }, [form.reservationDate]);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name || "", email: user.email || "" }));
  }, [user]);

  useEffect(() => {
    if (!availableTimes.includes(form.reservationTime)) {
      setForm((f) => ({ ...f, reservationTime: availableTimes[0] || "" }));
    }
  }, [availableTimes, form.reservationTime]);

  const handleChange = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      toast.error("Please login or sign up to reserve a table.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.reservationDate || !form.reservationTime) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reservation/create", { ...form, guests: Number(form.guests) });
      if (data.success) {
        toast.success("Reservation submitted! Waiting for admin confirmation.");
        setForm({ ...initialForm, name: user.name || "", email: user.email || "" });
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally { setLoading(false); }
  };

  return (
    <section id="table-registration" className="mt-16 mb-8 scroll-mt-24">
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="bg-primary/10 px-6 py-8 md:px-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Table Registration</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">Reserve Your Table</h2>
          <p className="text-gray-500 mt-2 max-w-2xl">Choose your preferred date and time and send us your table reservation request.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium mb-1.5">Full Name *</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"/></div>
            <div><label className="block text-sm font-medium mb-1.5">Phone Number *</label><input name="phone" value={form.phone} onChange={handleChange} required type="tel" inputMode="tel" placeholder="Enter phone number" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"/></div>
            <div><label className="block text-sm font-medium mb-1.5">Email</label><input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter email address" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"/></div>
            <div><label className="block text-sm font-medium mb-1.5">Number of Guests *</label><select name="guests" value={form.guests} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary bg-white">{Array.from({length:20},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>)}</select></div>
            <div><label className="block text-sm font-medium mb-1.5">Reservation Date *</label><input name="reservationDate" value={form.reservationDate} onChange={handleChange} required type="date" min={getToday()} className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"/></div>
            <div><label className="block text-sm font-medium mb-1.5">Reservation Time *</label><select name="reservationTime" value={form.reservationTime} onChange={handleChange} disabled={availableTimes.length===0} className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary bg-white">{availableTimes.length ? availableTimes.map(t=><option key={t} value={t}>{t}</option>) : <option>No more slots today</option>}</select>{form.reservationDate===getToday() && <p className="text-xs text-gray-500 mt-1">Past time slots are automatically hidden.</p>}</div>
            <div className="md:col-span-2"><label className="block text-sm font-medium mb-1.5">Special Request</label><textarea name="specialRequest" value={form.specialRequest} onChange={handleChange} rows="3" placeholder="Birthday, anniversary, window seat, etc." className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"/></div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><p className="text-xs text-gray-500">Your request remains <b>Pending</b> until the admin confirms it.</p><button disabled={loading || availableTimes.length===0} type="submit" className="bg-primary hover:bg-primary-dull disabled:opacity-60 text-white px-7 py-3 rounded-full transition">{loading ? "Submitting..." : "Register Table"}</button></div>
        </form>
      </div>
    </section>
  );
};
export default TableReservation;
