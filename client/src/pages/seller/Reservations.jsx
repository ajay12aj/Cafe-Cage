import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Reservations = () => {
    const { axios } = useAppContext();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/reservation/admin");

            if (data.success) {
                setReservations(Array.isArray(data.reservations) ? data.reservations : []);
            } else {
                toast.error(data.message || "Could not load reservations.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Could not load reservations.");
        } finally {
            setLoading(false);
        }
    };

    const confirmReservation = async (id) => {
        try {
            const { data } = await axios.patch(`/api/reservation/${id}/confirm`);

            if (data.success) {
                toast.success(data.message || "Reservation confirmed.");
                setReservations((current) =>
                    current.map((item) =>
                        item._id === id ? { ...item, status: "Confirmed" } : item
                    )
                );
            } else {
                toast.error(data.message || "Could not confirm reservation.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Could not confirm reservation.");
        }
    };

    const deleteReservation = async (id) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this reservation?"
        );
        if (!shouldDelete) return;

        try {
            const { data } = await axios.delete(`/api/reservation/${id}`);

            if (data.success) {
                toast.success(data.message || "Reservation deleted.");
                setReservations((current) => current.filter((item) => item._id !== id));
            } else {
                toast.error(data.message || "Could not delete reservation.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Could not delete reservation.");
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="no-scrollbar min-w-0 flex-1 h-[95vh] overflow-y-auto overflow-x-hidden">
            <div className="w-full min-w-0 p-3 sm:p-4 lg:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-gray-800">Table Reservations</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Confirm or delete customer table registration requests.
                        </p>
                    </div>
                    <button
                        onClick={fetchReservations}
                        disabled={loading}
                        className="shrink-0 self-start rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60 sm:self-auto"
                    >
                        {loading ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {loading ? (
                    <div className="rounded-md border border-gray-200 p-8 text-center text-gray-500">
                        Loading reservations...
                    </div>
                ) : reservations.length === 0 ? (
                    <div className="rounded-md border border-gray-200 p-8 text-center text-gray-500">
                        No table reservations found.
                    </div>
                ) : (
                    <div className="w-full min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white">
                        <table className="w-full table-fixed text-xs sm:text-sm">
                            <colgroup>
                                <col style={{ width: "18%" }} />
                                <col style={{ width: "22%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "12%" }} />
                                <col style={{ width: "16%" }} />
                            </colgroup>
                            <thead className="bg-gray-50 text-gray-800">
                                <tr>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Customer</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Contact</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Date &amp; Time</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Guests</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Request</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Status</th>
                                    <th className="break-words px-2 py-3 text-left font-semibold sm:px-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation._id} className="border-t border-gray-200">
                                        <td className="break-words px-2 py-3 align-middle sm:px-3 sm:py-4">
                                            <p className="font-medium text-gray-800">{reservation.name || "—"}</p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Submitted: {reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString() : "—"}
                                            </p>
                                        </td>

                                        <td className="px-2 py-3 align-middle text-gray-600 sm:px-3 sm:py-4">
                                            <p className="break-words">{reservation.phone || "—"}</p>
                                            {reservation.email && (
                                                <p className="mt-1 break-all text-xs">{reservation.email}</p>
                                            )}
                                        </td>

                                        <td className="break-words px-2 py-3 align-middle sm:px-3 sm:py-4">
                                            <p className="font-medium">{reservation.reservationDate || "—"}</p>
                                            <p className="mt-1 break-words text-gray-500">{reservation.reservationTime || "—"}</p>
                                        </td>

                                        <td className="break-words px-2 py-3 align-middle sm:px-3 sm:py-4">
                                            {reservation.guests ?? "—"}
                                        </td>

                                        <td className="break-words px-2 py-3 align-middle text-gray-600 sm:px-3 sm:py-4">
                                            {reservation.specialRequest || "—"}
                                        </td>

                                        <td className="break-words px-2 py-3 align-middle sm:px-3 sm:py-4">
                                            <span
                                                className={`inline-flex max-w-full items-center justify-center break-words rounded-full px-2 py-1 text-[11px] font-medium sm:px-3 sm:text-xs ${reservation.status === "Confirmed"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {reservation.status || "Pending"}
                                            </span>
                                        </td>

                                        <td className="px-2 py-3 align-middle sm:px-3 sm:py-4">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {reservation.status !== "Confirmed" && (
                                                    <button
                                                        onClick={() => confirmReservation(reservation._id)}
                                                        className="whitespace-nowrap rounded-md bg-primary px-2 py-1.5 text-xs text-white hover:bg-primary-dull sm:px-2.5"
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteReservation(reservation._id)}
                                                    className="whitespace-nowrap rounded-md border border-red-300 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 sm:px-2.5"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservations;
