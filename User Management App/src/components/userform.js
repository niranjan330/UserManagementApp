import React, { useState } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ currentUser, setCurrentUser, users, setUsers }) => {
  const [formData, setFormData] = useState(
    currentUser || { firstName: "", lastName: "", email: "", department: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser.id, formData)
        .then((updatedUser) =>
          setUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
          )
        )
        .catch((error) => console.error("Failed to update user:", error));
    } else {
      addUser(formData)
        .then((newUser) => setUsers((prev) => [newUser, ...prev]))
        .catch((error) => console.error("Failed to add user:", error));
    }
    setFormData({ firstName: "", lastName: "", email: "", department: "" });
    setCurrentUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{currentUser ? "Edit User" : "Add User"}</h3>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
      />
      <button type="submit" className="btn btn-success">
        {currentUser ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default UserForm;
