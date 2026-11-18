import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const emptyStats = {
  totalOrders: 0,
  totalReservations: 0,
  totalRevenue: 0,
  todayOrders: 0,
  todayReservations: 0,
  todayRevenue: 0,
  todayDate: "",
  timezone: "Asia/Kolkata",
};

const Growth = () => {
  const { axios, currency } = useAppContext();
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (showLoader = false) => {
    try {
      if (showLoader) setRefreshing(true);

      const { data } = await axios.get("/api/order/growth");

      if (data.success) {
        setStats((current) => ({ ...current, ...data.stats }));
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message || "Unable to load growth data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();

    const timer = setInterval(() => {
      load();
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const totalCards = [
    ["Total Orders", stats.totalOrders, "orders"],
    ["Total Reservations", stats.totalReservations, "tables"],
    ["Total Revenue", `${currency}${Number(stats.totalRevenue).toFixed(2)}`, "revenue"],
  ];

  const todayCards = [
    ["Today's Orders", stats.todayOrders, "today-orders"],
    ["Today's Reservations", stats.todayReservations, "today-reservations"],
    ["Today's Revenue", `${currency}${Number(stats.todayRevenue).toFixed(2)}`, "today-revenue"],
  ];

  const renderCards = (cards) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map(([title, value, key]) => (
        <div
          key={key}
          className="rounded-2xl p-6 bg-white border shadow-sm hover:-translate-y-1 transition-transform"
        >
          <p className="text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-primary mt-3">{value}</p>
          <p className="text-xs text-gray-400 mt-2">Updated automatically</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="w-full md:p-10 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Growth</h2>
            <p className="text-sm text-gray-500 mt-1">
              Live business overview from orders and reservations.
            </p>
            {stats.todayDate && (
              <p className="text-xs text-gray-400 mt-1">
                Today: {stats.todayDate} · {stats.timezone}
              </p>
            )}
          </div>

          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="border rounded-full px-4 py-2 text-sm disabled:opacity-50"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center border rounded-xl">
            Loading growth data...
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-medium mb-4">Overall Performance</h3>
              {renderCards(totalCards)}
            </section>

            <section>
              <h3 className="text-lg font-medium mb-4">Today's Performance</h3>
              {renderCards(todayCards)}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Growth;
