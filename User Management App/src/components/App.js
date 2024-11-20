import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import Pagination from "./Pagination";
import { fetchUsers } from "../services/api";
import "../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>
      <UserForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={users}
        setUsers={setUsers}
      />
      <UserList
        users={paginatedUsers}
        setUsers={setUsers}
        setCurrentUser={setCurrentUser}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={users.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
