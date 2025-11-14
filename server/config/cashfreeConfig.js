import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const cashfree = axios.create({
  baseURL: process.env.CASHFREE_BASE_URL,
  headers: {
    "x-client-id": process.env.CASHFREE_APP_ID,
    "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    "x-api-version": "2022-09-01",
    "Content-Type": "application/json",
  },
});
