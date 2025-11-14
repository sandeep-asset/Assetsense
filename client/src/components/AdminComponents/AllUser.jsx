import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure to delete this user?")) {
  //     try {
  //       await axios.delete(`${backendUrl}/api/auth/users/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       toast.success("User deleted successfully");
  //       fetchUsers();
  //     } catch {
  //       toast.error("User Deletion Failed");
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    // Custom toast for confirmation
    const confirmToast = toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4`}
      >
        <p className="text-gray-900 font-semibold">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // close confirm toast
              try {
                await axios.delete(`${backendUrl}/api/auth/users/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.success(" User deleted successfully");
                fetchUsers();
              } catch (error) {
                toast.error("❌ Failed to delete user");
              }
            }}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 px-3 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  // Update user role
  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(
        `${backendUrl}/api/auth/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User Updated Successfully");
      fetchUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  // Open update modal
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  // Close update modal
  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  // Handle update form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await axios.put(
        `${backendUrl}/api/auth/users/${selectedUser._id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User updated successfully");
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // Handle input changes in update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get role badge color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "Owner":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800">
              User Management
            </h2>
            <div className="text-xs text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
              Total Users: {users.length}
            </div>
          </div>

          <div className="relative w-full max-w-full overflow-x-auto overflow-y-auto md:overflow-y-visible rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="p-4 font-semibold whitespace-nowrap">
                    User Info
                  </th>
                  <th className="p-4 font-semibold whitespace-nowrap">
                    Contact
                  </th>
                  <th className="p-4 font-semibold whitespace-nowrap">Role</th>
                  <th className="p-4 text-center font-semibold whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u, index) => (
                  <tr
                    key={u._id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {u.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {u.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {u._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap text-gray-700">
                      {u.email}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        className={`border-0 rounded-full px-3 py-1 text-sm font-medium ${getRoleColor(
                          u.role
                        )} focus:ring-2 focus:ring-blue-300 outline-none cursor-pointer`}
                      >
                        <option value="user">User</option>
                        <option value="Owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => handleUpdateClick(u)}
                          className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-all duration-200 text-xs sm:text-sm shadow-sm"
                        >
                          <FaEdit />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="flex items-center gap-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-md transition-all duration-200 text-xs sm:text-sm shadow-sm"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <div className="text-gray-500 text-lg">No users found</div>
            </div>
          )}
        </div>
      </div>

      {/* Update User Modal */}
      {isUpdateModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Update User</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                >
                  <option value="user">User</option>
                  <option value="Owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
