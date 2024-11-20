import React from "react";
import { deleteUser } from "../services/api";

const UserList = ({ users, setUsers, setCurrentUser }) => {
  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => setUsers((prev) => prev.filter((user) => user.id !== id)))
      .catch((error) => console.error("Failed to delete user:", error));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentUser(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
