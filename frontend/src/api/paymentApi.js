import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const createOrder = (amount) =>
  API.post("/api/payment/create-order", { amount });

export const verifyPayment = (data) =>
  API.post("/api/payment/verify-payment", data);
