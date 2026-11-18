import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import { createReservation, getUserReservations, getAllReservations, confirmReservation, deleteReservation } from "../controllers/reservationController.js";

const reservationRouter = express.Router();
reservationRouter.post("/create", authUser, createReservation);
reservationRouter.get("/user", authUser, getUserReservations);
reservationRouter.get("/admin", authSeller, getAllReservations);
reservationRouter.patch("/:id/confirm", authSeller, confirmReservation);
reservationRouter.delete("/:id", authSeller, deleteReservation);
export default reservationRouter;
