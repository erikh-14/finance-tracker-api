import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { expenses } from "../utils/Icons";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
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
    
    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
        getIncomes();
    }

    // Function to add an income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}/add-income`, income);
            getIncomes(); // Refresh incomes after adding a new one
        } catch (err) {
            console.error("Error adding income:", err);
            setError(err.response?.data?.message || "Error adding income");
        }
        getIncomes();
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome =  totalIncome + income.amount;
        });
        return totalIncome;
    }
    console.log(totalIncome());

   
    


    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-expenses`);
            setExpenses(response.data || []); // Ensure fallback to an empty array
        } catch (err) {
            console.error("Error fetching expenses:", err.response?.data || err.message);
        }
    }, []);
    
    
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };
    
    // Correctly refresh expenses after adding one
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}/add-expense`, expense);
            getExpenses(); // Refresh expenses after addition
        } catch (err) {
            console.error("Error adding expense:", err);
            setError(err.response?.data?.message || "Error adding expense");
        }
    };
    
    // Ensure deleteExpense refreshes the list properly
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };
    
    




    return (
        <GlobalContext.Provider value={{ incomes, totalIncome, getIncomes, addIncome, deleteIncome, addExpense, deleteExpense, totalExpenses, getExpenses }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
