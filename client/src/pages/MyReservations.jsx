import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyReservations = () => {
    const [myReservations, setMyReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { axios, user } = useAppContext();

    const fetchMyReservations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/reservation/user");
            if (data.success) {
                setMyReservations(data.reservations);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) { setLoading(false); return; }
        fetchMyReservations();
        const timer = setInterval(fetchMyReservations, 3000);
        return () => clearInterval(timer);
    }, [user]);

    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">My Reservation</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            {!user ? (
                <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-500 max-w-4xl">
                    Please login to view your reservations.
                </div>
            ) : loading ? (
                <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-500 max-w-4xl">
                    Loading your reservations...
                </div>
            ) : myReservations.length === 0 ? (
                <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-500 max-w-4xl">
                    You don't have any reservations yet.
                </div>
            ) : (
                <div className="space-y-5 max-w-4xl">
                    {myReservations.map((reservation) => (
                        <div
                            key={reservation._id}
                            className="border border-gray-300 rounded-lg p-5 bg-white"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <div>
                                    <p className="text-lg font-medium text-gray-800">
                                        Table Reservation
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Reservation ID: {reservation._id}
                                    </p>
                                </div>
                                <span
                                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                                        reservation.status === "Confirmed"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {reservation.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-800">Name:</span> {reservation.name}</p>
                                <p><span className="font-medium text-gray-800">Phone:</span> {reservation.phone}</p>
                                <p><span className="font-medium text-gray-800">Date:</span> {reservation.reservationDate}</p>
                                <p><span className="font-medium text-gray-800">Time:</span> {reservation.reservationTime}</p>
                                <p><span className="font-medium text-gray-800">Guests:</span> {reservation.guests}</p>
                                <p><span className="font-medium text-gray-800">Email:</span> {reservation.email || user.email}</p>
                            </div>

                            {reservation.specialRequest && (
                                <div className="mt-4 bg-primary/5 rounded-lg p-3 text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">Special Request:</span>{" "}
                                    {reservation.specialRequest}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReservations;
