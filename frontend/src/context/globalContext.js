import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5000/api/v1";

    // Function to fetch incomes
    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            console.error("Error fetching incomes:", err.response?.data || err.message);
        }
    }, []);
    

    // Function to add an income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}/add-income`, income);
            getIncomes(); // Refresh incomes after adding a new one
        } catch (err) {
            console.error("Error adding income:", err);
            setError(err.response?.data?.message || "Error adding income");
        }
    };

   

    return (
        <GlobalContext.Provider value={{ incomes, getIncomes, addIncome }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
