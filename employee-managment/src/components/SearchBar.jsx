import React, { useState, useEffect } from "react";
import { Search, X, Users, PlusCircle } from "lucide-react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { state, dispatch } = useEmployeeContext();
  const { employees } = state;
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  // Debounced dispatch for search + filter
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({
        type: "GET_EMP",
        payload: { query: input, department, status },
      });
    }, 200);
    return () => clearTimeout(t);
  }, [input, department, status, dispatch]);

  const clear = () => {
    setInput("");
    setDepartment("all");
    setStatus("all");
    dispatch({
      type: "GET_EMP",
      payload: { query: "", department: "all", status: "all" },
    });
  };

  return (
    <div className="relative w-full">
      <div className="p-6 space-y-6">
        {/* Search input */}
        <div className="relative flex items-center w-full max-w-3xl mx-auto rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Search className="w-5 h-5 absolute left-4 text-gray-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search employees…"
            className="w-full pl-12 pr-12 py-3 rounded-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          {input && (
            <button
              onClick={clear}
              className="absolute right-3 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Department filter */}
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="pl-4 pr-8 py-2 rounded-full border border-gray-300 bg-white/70 backdrop-blur-md text-gray-700 shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Departments</option>
              {[...new Set(employees.map((e) => e.department))].map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="pl-4 pr-8 py-2 rounded-full border border-gray-300 bg-white/70 backdrop-blur-md text-gray-700 shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Add Employee Button */}
      <button
        onClick={() => navigate("/add")}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
      >
        <PlusCircle className="w-5 h-5" />
        Add Employee
      </button>
    </div>
  );
}

export default SearchBar;
