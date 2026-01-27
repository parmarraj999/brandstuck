import axios from "axios";

const API = axios.create({
  baseURL: "https://brandstuck-server.onrender.com",
});

export const createOrder = (amount) =>
  API.post("/api/payment/create-order", { amount });

export const pingServer = () =>
  API.get("/"); // Simple GET to wake up the server

export const verifyPayment = (data) =>
  API.post("/api/payment/verify-payment", data);
