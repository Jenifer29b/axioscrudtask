import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setData(data.filter((user) => user.id !== id));
      alert("User deleted successfully:");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editUser.id}`,
        formData
      );
      setData((prevData) =>
        prevData.map((user) => (user.id === editUser.id ? response.data : user))
      );
      setEditUser(null);
      alert("User updated successfully:");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>
        <center>User Table</center>
      </h1>
      {/* Edit Form */}
      {editUser && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            <center>Edit User</center>
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              margin: "50px",
              padding: "20px",
              marginLeft: "50px",
              border: "2px solid black",
              borderRadius: "10px",
              display: "inline-block",
            }}
          >
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit" style={{ backgroundColor: "red" }}>
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              style={{ backgroundColor: "green" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table
        border="2"
        style={{
          margin: "50px",
          padding: "20px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <button
                style={{
                  border: "2px solid black",
                  gap: "2px",
                  borderRadius: "5px",
                  backgroundColor: "lightgreen",
                  marginLeft: "5px",
                }}
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                style={{
                  border: "2px solid black",
                  gap: "2px",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  backgroundColor: "red",
                }}
                onClick={() => {
                  handleDelete(user.id);
                }}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
