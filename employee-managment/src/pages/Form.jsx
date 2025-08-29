import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useEmployeeContext();

  const isEdit = Boolean(id);
  const existingEmp = isEdit
    ? state.employees.find((emp) => emp.id === Number(id))
    : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
  });

  // Prefill for edit mode
  useEffect(() => {
    if (isEdit && existingEmp) {
      setFormData({
        name: existingEmp.name || "",
        email: existingEmp.email || "",
        role: existingEmp.role || "",
        department: existingEmp.department || "",
        status: existingEmp.status || "Active",
      });
    }
  }, [isEdit, existingEmp]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch({ type: "EDIT_EMP", payload: { ...formData, id: Number(id) } });
    } else {
      dispatch({
        type: "ADD_EMP",
        payload: { ...formData, id: Date.now() },
      });
    }
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-purple-500 rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-white">
            {isEdit ? "Edit Employee" : "Add Employee"}
          </h2>
          <p className="text-purple-100 text-sm">
            {isEdit
              ? "Update employee details below."
              : "Fill in the employee details below."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Department + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select</option>
                <option value="R&D">R&D</option>
                <option value="Platform">Platform</option>
                <option value="Security">Security</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
              {isEdit ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
