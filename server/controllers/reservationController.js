import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

const toMinutes = (time) => {
  const [clock, meridiem] = String(time || "").split(" ");
  if (!clock || !meridiem) return NaN;
  let [hours, minutes] = clock.split(":").map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return NaN;
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export const createReservation = async (req, res) => {
  try {
    const { name, phone, email, reservationDate, reservationTime, guests, specialRequest } = req.body;
    if (!req.body.userId) return res.status(401).json({ success: false, message: "Please login first." });
    if (!name || !phone || !reservationDate || !reservationTime || !guests)
      return res.status(400).json({ success: false, message: "Please fill all required fields." });

    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20)
      return res.status(400).json({ success: false, message: "Guests must be between 1 and 20." });

    const selectedDate = new Date(`${reservationDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today)
      return res.status(400).json({ success: false, message: "Please select today or a future date." });

    if (reservationDate === `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`) {
      const now = new Date();
      if (toMinutes(reservationTime) <= now.getHours() * 60 + now.getMinutes())
        return res.status(400).json({ success: false, message: "Please select a future reservation time." });
    }

    const user = await User.findById(req.body.userId).select("email");
    if (!user) return res.status(401).json({ success: false, message: "User not found." });

    const reservation = await Reservation.create({
      userId: user._id,
      name: name.trim(),
      phone: phone.trim(),
      email: (email || user.email || "").toLowerCase(),
      reservationDate,
      reservationTime,
      guests: guestCount,
      specialRequest: specialRequest || "",
    });
    return res.json({ success: true, message: "Table reservation submitted successfully.", reservation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("email");
    if (!user) return res.status(401).json({ success: false, message: "User not found." });
    const reservations = await Reservation.find({
      $or: [{ userId: user._id }, { userId: { $exists: false }, email: user.email }]
    }).sort({ reservationDate: -1, reservationTime: 1, createdAt: -1 });
    return res.json({ success: true, reservations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reservationDate: 1, reservationTime: 1, createdAt: -1 });
    return res.json({ success: true, reservations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: "Confirmed" }, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found." });
    return res.json({ success: true, message: "Reservation confirmed successfully.", reservation });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found." });
    return res.json({ success: true, message: "Reservation deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
