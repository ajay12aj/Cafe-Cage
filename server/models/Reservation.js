import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: "" },
  reservationDate: { type: String, required: true },
  reservationTime: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 20 },
  specialRequest: { type: String, trim: true, default: "" },
  status: { type: String, enum: ["Pending", "Confirmed"], default: "Pending" },
}, { timestamps: true });

const Reservation = mongoose.models.reservation || mongoose.model("reservation", reservationSchema);
export default Reservation;
