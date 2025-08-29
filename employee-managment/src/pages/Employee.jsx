import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

function Employee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useEmployeeContext();
  const [showModal, setShowModal] = useState(false);

  const emp = state.employees.find((e) => e.id === Number(id));

  if (!emp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Employee not found</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch({ type: "DEL_EMP", payload: emp.id });
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 md:p-6 flex-col">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-purple-500 rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-white">{emp.name}</h2>
          <p className="text-purple-100 text-sm">{emp.role}</p>
        </div>

        {/* Employee Details */}
        <div className="flex-1 px-6 md:px-8 py-6 space-y-5 overflow-y-auto">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">{emp.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-lg font-medium text-gray-800">{emp.department}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                emp.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : emp.status === "On Leave"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {emp.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 md:px-8 py-6 border-t border-gray-100 flex justify-end gap-3">
          <Link
            to={`/edit/${emp.id}`}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Delete Employee</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">{emp.name}</span>? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Link to="/" className="text-purple-600 p-5">
        Back to Employees
      </Link>
    </div>
  );
}

export default Employee;
