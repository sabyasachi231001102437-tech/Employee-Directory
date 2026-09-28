import React, { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Das",
      empId: "EMP001",
      department: "Farming",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Howrah"
    },
    {
      id: 2,
      name: "Priya Roy",
      empId: "EMP002",
      department: "Management",
      gender: "Female",
      phone: "9876543211",
      localAddress: "Kolkata",
      permanentAddress: "Durgapur"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.empId ||
      !formData.department ||
      !formData.gender ||
      !formData.phone
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editId
            ? { ...formData, id: editId }
            : employee
        )
      );

      setEditId(null);
      alert("Employee updated successfully");
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now()
      };

      setEmployees([...employees, newEmployee]);
      alert("Employee added successfully");
    }

    setFormData({
      name: "",
      empId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    });
  };

  // Delete employee
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      empId: employee.empId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress
    });

    setEditId(employee.id);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditId(null);

    setFormData({
      name: "",
      empId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    });
  };

  // Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.empId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      {/* Employee Form */}
      <div className="form-box">
        <h2>{editId ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="empId"
            placeholder="Employee ID"
            value={formData.empId}
            onChange={handleChange}
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="Farming">Farming</option>
            <option value="Management">Management</option>
            <option value="Sales">Sales</option>
            <option value="Accounts">Accounts</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="localAddress"
            placeholder="Local Address"
            value={formData.localAddress}
            onChange={handleChange}
          />

          <input
            type="text"
            name="permanentAddress"
            placeholder="Permanent Address"
            value={formData.permanentAddress}
            onChange={handleChange}
          />

          <button type="submit">
            {editId ? "Update Employee" : "Add Employee"}
          </button>

          {editId && (
            <button
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Search and Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by Name or Employee ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Farming">Farming</option>
          <option value="Management">Management</option>
          <option value="Sales">Sales</option>
          <option value="Accounts">Accounts</option>
        </select>
      </div>

      {/* Employee Count */}
      <h2 className="count">
        Total Employees: {employees.length}
      </h2>

      {/* Employee List */}
      <div className="employee-list">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div className="employee-card" key={employee.id}>
              <h2>{employee.name}</h2>

              <p>
                <strong>Employee ID:</strong> {employee.empId}
              </p>

              <p>
                <strong>Department:</strong> {employee.department}
              </p>

              <p>
                <strong>Gender:</strong> {employee.gender}
              </p>

              <p>
                <strong>Phone:</strong> {employee.phone}
              </p>

              <p>
                <strong>Local Address:</strong> {employee.localAddress}
              </p>

              <p>
                <strong>Permanent Address:</strong>{" "}
                {employee.permanentAddress}
              </p>

              <button
                className="edit"
                onClick={() => handleEdit(employee)}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => handleDelete(employee.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No employee found.</p>
        )}
      </div>
    </div>
  );
}

export default App;