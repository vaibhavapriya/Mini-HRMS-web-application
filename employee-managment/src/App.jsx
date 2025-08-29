import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar'
import Employee from './pages/Employee'
import Employees from './pages/Employees'
import Form from './pages/Form'
import './App.css'
import { EmployeeProvider } from './context/EmployeeContext';
import { Users } from "lucide-react";

function App() {

    return (
        <EmployeeProvider>
            <Router>
                {/* Header */}
                <div className="mb-4 flex items-center gap-2 bg-purple-500 p-7">
                    <Users className="w-5 h-5 text-white" />
                    <h1 className="text-xl text-white font-semibold">Employee Directory</h1>
                </div>
                <Routes>
                    <Route path="/" element={<Employees />} />
                    <Route path="/add" element={<Form mode="add" />} />
                    <Route path="/edit/:id" element={<Form mode="edit" />} />
                    <Route path="/:id" element={<Employee />} />
                </Routes>
            </Router>
        </EmployeeProvider>
    )
}

export default App
