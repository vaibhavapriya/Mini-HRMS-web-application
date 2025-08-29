import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import { Pencil, Trash2 } from "lucide-react";

function List() {
  const { state, dispatch } = useEmployeeContext();
  const employees = state.filteredEmployees.length
    ? state.filteredEmployees
    : state.employees;

  const [visibleCount, setVisibleCount] = useState(10);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 10, employees.length));
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [employees.length]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch({ type: "DEL_EMP", payload: id });
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.slice(0, visibleCount).map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-2">{emp.id}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/${emp.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {emp.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    emp.status === "Active"
                      ? "text-green-600"
                      : emp.status === "On Leave"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {emp.status}
                </td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  {/* Edit */}
                  <button
                    onClick={() => navigate(`/edit/${emp.id}`)}
                    className="p-2 rounded-full hover:bg-purple-100 text-purple-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < employees.length && (
        <div
          ref={loadMoreRef}
          className="py-4 text-center text-gray-500 text-sm"
        >
          Loading more employees...
        </div>
      )}
    </div>
  );
}

export default List;
