import React, { useEffect, createContext, useReducer, useContext }  from 'react'
const EmployeeContext = createContext();

const initialState = {
      employees: [
    {
      id: 1,
      name: "Ada Lovelace",
      email: "ada@example.com",
      department: "R&D",
      role: "Software Engineer",
      status: "Active",
    },
    {
      id: 2,
      name: "Grace Hopper",
      email: "grace@example.com",
      department: "Platform",
      role: "Staff Engineer",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Alan Turing",
      email: "alan@example.com",
      department: "Security",
      role: "Security Analyst",
      status: "Inactive",
    },
  ],
    filteredEmployees: [],
    view: 'list',
    query: '',
    department: "all",
    status: "all",
};

function normalize(str) {
  return (str || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function applyFilters(state) {
  const { employees, query, department, status } = state;

  const q = normalize(query);

  return employees.filter((emp) => {
    // Search by name or email
    const matchesQuery =
      !q ||
      [emp.name, emp.email].map(normalize).some((field) => field.includes(q));

    // Department filter
    const matchesDepartment = department === "all" || emp.department === department;

    // Status filter
    const matchesStatus = status === "all" || emp.status === status;

    return matchesQuery && matchesDepartment && matchesStatus;
  });
}

function EmployeeReducer(state, action) {
  switch (action.type) {
    case "GET_EMP": {
      const newState = {
        ...state,
        ...action.payload,
      };
      return {
        ...newState,
        filteredEmployees: applyFilters(newState),
      };
    }

    case "ADD_EMP":
      return {
        ...state,
        employees: [...state.employees, action.payload],
        filteredEmployees: [...state.employees, action.payload],
      };

    case "DEL_EMP": {
      const updated = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      return {
        ...state,
        employees: updated,
        filteredEmployees: updated,
      };
    }

    case "EDIT_EMP": {
      const updated = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      return {
        ...state,
        employees: updated,
        filteredEmployees: updated,
      };
    }

    case "SET_VIEW": {
        return {
            ...state,
            view: action.payload,
        };
    }

    default:
      return state;
  }
}

export const EmployeeProvider = ({ children }) => {
    //const [state, dispatch] = useReducer(EmployeeReducer, {...initialState, filteredEmployees: initialState.employees});
    const storedState = JSON.parse(localStorage.getItem("employeeState"));

    const [state, dispatch] = useReducer(EmployeeReducer, storedState || {
      ...initialState,
      filteredEmployees: initialState.employees,
    });

    useEffect(() => {
      localStorage.setItem("employeeState", JSON.stringify(state));
    }, [state]);
    return (
        <EmployeeContext.Provider value={{ state, dispatch }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => useContext(EmployeeContext);