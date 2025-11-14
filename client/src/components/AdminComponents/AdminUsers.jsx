// pages/AdminUsers.jsx
import React from "react";
import AllUsers from "../components/AllUsers";

const AdminUsers = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage all users, their roles and permissions
        </p>
      </div>
      <AllUsers />
    </div>
  );
};

export default AdminUsers;
