import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: <FaChartLine /> },
    { to: "/admin/orders", label: "Orders", icon: <FaHome /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/offices", label: "Offices", icon: <FaBuilding /> },
    { to: "/admin/leads", label: "Leads", icon: <FaHome /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <header
        className="md:hidden flex fixed items-center  justify-between bg-white shadow  px-4 py-3 z-50 w-full"
        style={{ top: "70px" }} // adjust this based on your navbar height
      >
        <button
          className="text-gray-700 text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="text-xl font-bold text-blue-700">Admin Panel</h1>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg transform md:translate-x-0 transition-transform duration-300 flex flex-col z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-white  border-b border-gray-200 px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-700 text-center">
            Admin Panel
          </h1>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto pt-20 md:pt-3 px-4 py-4">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg mb-2 font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
