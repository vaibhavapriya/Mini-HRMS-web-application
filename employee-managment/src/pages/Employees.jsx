import React from 'react'
import { LayoutList, LayoutGrid } from "lucide-react";
import List from '../components/List';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useEmployeeContext } from "../context/EmployeeContext";

function Employees() {
  const { state, dispatch } = useEmployeeContext();
  const { view, filteredEmployees } = state;

  return (
    <> 
      {/* Search Bar */}
      <SearchBar />

      {/* View Options */}
      <div className="flex justify-between items-center mb-6 pr-10">
        <h1></h1>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "SET_VIEW", payload: "list" })}
            className={`p-2 rounded-lg border ${
              view === "list"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>

          <button
            onClick={() => dispatch({ type: "SET_VIEW", payload: "card" })}
            className={`p-2 rounded-lg border ${
              view === "card"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Display employees */}
      {filteredEmployees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        view === "list" ? <List employees={filteredEmployees} /> : <Card employees={filteredEmployees} />
      )}
    </>
  );
}

export default Employees;
