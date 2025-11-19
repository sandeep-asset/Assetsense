// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-lg">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
