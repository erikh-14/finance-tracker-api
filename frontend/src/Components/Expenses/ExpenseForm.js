import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext(); // Access global context functions
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: null, // Use null for an empty date
        category: "",
        description: "",
    });

    const { title, amount, date, category, description } = inputState;

    // Handle input changes
    const handleInput = (name) => (event) => {
        const value = name === "amount" ? parseFloat(event.target.value) || "" : event.target.value; // Handle numbers safely
        setInputState({ ...inputState, [name]: value });
        setError(""); // Clear any existing error message
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !amount || !date || !category) {
            setError("All fields are required!");
            return;
        }
        await addExpense(inputState); // Call the addExpense function from context
        setInputState({
            title: "",
            amount: "",
            date: null,
            category: "",
            description: "",
        });
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput("title")}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    selected={date}
                    placeholderText="Enter A Date"
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })}
                />
            </div>
            <div className="input-control">
                <select
                    required
                    value={category}
                    name="category"
                    onChange={handleInput("category")}
                >
                    <option value="" disabled>
                        Select Option
                    </option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="traveling">Traveling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="4"
                    placeholder="Add A Reference"
                    value={description}
                    onChange={handleInput("description")}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={"Add Expense"}
                    icon={plus}
                    bPad={".8rem 1.6rem"}
                    bRad={"30px"}
                    bg={"var(--color-accent)"}
                    color={"#fff"}
                />
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;

    .input-control {
        display: flex;
        flex-direction: column;

        input,
        select,
        textarea {
            width: 100%;
            padding: 1rem;
            font-size: 1.2rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            outline: none;
            background: transparent;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(34, 34, 96, 0.6);
            &::placeholder {
                color: rgba(34, 34, 96, 0.6);
            }
            transition: border 0.3s ease;

            &:focus {
                border: 2px solid var(--color-green);
            }
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;

        button {
            padding: 1rem 2rem;
            font-size: 1.2rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    .error {
        color: var(--color-red);
        font-size: 1rem;
        text-align: center;
    }
`;

export default ExpenseForm;
