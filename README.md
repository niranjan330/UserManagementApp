# UserManagementApp
# User Management Dashboard

## Overview
This is a React-based dashboard that allows users to manage their details. Users can view, add, edit, and delete user information through interactions with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. The dashboard includes pagination for listing users, client-side form validation, and error handling.

### Features
- View a list of users.
- Add new users.
- Edit user details.
- Delete users.
- Pagination for navigating through users.
- Error boundary for handling crashes.
- Responsive UI with Bootstrap.

### Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making API requests.
- **JSONPlaceholder API**: A mock API for testing and prototyping.
- **Bootstrap**: For responsive layout and styling.

## Installation

Follow the steps below to set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd user-management-dashboard
   npm install
   npm start
   user-management-dashboard/
├── src/
│   ├── components/
│   │   ├── App.js             # Main app component
│   │   ├── UserList.js        # Displays user list
│   │   ├── UserForm.js        # Handles user add/edit form
│   │   ├── Pagination.js      # Handles pagination for the user list
│   │   ├── ErrorBoundary.js   # Catches errors in the application
│   ├── services/
│   │   ├── api.js             # API interaction functions
│   ├── styles/
│   │   ├── App.css            # Application styling (Bootstrap integrated)
│   ├── index.js               # Entry point for React app
│   ├── reportWebVitals.js     # Web vitals for performance tracking

import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import Pagination from "./Pagination";
import { fetchUsers } from "../services/api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers(currentPage)
      .then((data) => {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  }, [currentPage]);

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={users}
        setUsers={setUsers}
      />
      <UserList users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default App;

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch users with pagination
export const fetchUsers = async (page = 1) => {
  const response = await axios.get(`${API_URL}?_page=${page}&_limit=5`);
  const totalPages = Math.ceil(response.headers["x-total-count"] / 5);
  return { users: response.data, totalPages };
};

// Add a new user (simulated)
export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Edit user
export const editUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorMessage: error.toString() });
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

Future Enhancements
Authentication: Add user authentication to manage permissions.
Form Validation: Integrate form validation libraries like Formik/Yup.
Styling: Enhance UI with Material-UI or TailwindCSS.

