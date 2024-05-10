import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import EditUser from "./EditUser";

const ShowAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(false);

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditingUser(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setEditingUser(false);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUsers(users.filter((user) => user._id!== userId));
        fetchUsers(); // Reload the user table after a user is deleted
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleUpdated = () => {
    fetchUsers();
  };

  const pageStyles = `
 .container {
      max-width: 100%;
      margin: 0 auto;
      padding: 2rem;
      background-color: #f2f2f2;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      margin-bottom: 3rem;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      text-align: left;
    }
    th {
      font-weight: bold;
      color: #333;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    button {
      border-radius: 4px;
      border: 1px solid #ccc;
      padding: 0.5rem;
      margin-bottom: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
  .btn-primary {
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  .btn-danger {
      background-color: #dc3545;
      color: #fff;
      border-color: #dc3545;
    }
  .btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  .btn:hover {
      color: #212529;
      text-decoration: none;
    }
  .btn-primary:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
  .btn-danger:hover {
      background-color: #c82333;
      border-color: #bd2130;
    }
  .btn-group {
      display: flex;
      justify-content: flex-end;
    }
  `;

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <style>{pageStyles}</style>
      <h1 className="mb-4">All Users</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Username</th>
            <th>NIC</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                {user.image? (
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <FaUserCircle
                    style={{ width: "50px", height: "50px", color: "#ccc" }}
                  />
                )}
              </td>
              <td>{user.fullName}</td>
              <td>{user.userName}</td>
              <td>{user.NIC}</td>
              <td>{user.status}</td>
              <td className="btn-group">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <EditUser
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleUpdated}
        />
      )}
    </div>
  );
};

export default ShowAllUsers;