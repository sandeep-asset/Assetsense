import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const cashfree = axios.create({
  baseURL: process.env.CASHFREE_BASE_URL, // MUST end with /pg/orders
  headers: {
    "x-client-id": process.env.CASHFREE_APP_ID, // API KEY
    "x-client-secret": process.env.CASHFREE_API_SECRET, // API SECRET KEY
    "x-api-version": "2022-09-01",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
