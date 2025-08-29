import React from "react";
import { Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

function Card() {
  const { state } = useEmployeeContext();
  const employees = state.filteredEmployees.length
    ? state.filteredEmployees
    : state.employees;

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    "On Leave": "bg-yellow-100 text-yellow-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-7">
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          {/* Name & Status */}
          <div className="flex justify-between items-start mb-3">
            <Link
              to={`/${emp.id}`}
              className="text-lg font-semibold text-indigo-600 hover:underline"
            >
              {emp.name}
            </Link>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusStyles[emp.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {emp.status}
            </span>
          </div>

          {/* Employee Details */}
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Email:</span> {emp.email}
            </p>
            <p>
              <span className="font-medium">Department:</span> {emp.department}
            </p>
            <p>
              <span className="font-medium">Role:</span> {emp.role}
            </p>
            <p>
              <span className="font-medium">EMP ID:</span> {emp.id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
