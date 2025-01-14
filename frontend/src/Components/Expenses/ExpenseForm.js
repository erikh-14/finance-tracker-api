import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";


function ExpenseForm() {
    const { addExpense, getExpenses } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (event) => {
        const value = name === "amount" ? parseFloat(event.target.value) : event.target.value;
        setInputState({ ...inputState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addExpense(inputState);
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
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) =>
                        setInputState({ ...inputState, date: date })
                    }
                />
            </div>
            <div className="input-control">
                <select
                    required
                    value={category}
                    name="category"
                    onChange={handleInput("category")}
                >
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="side-hustle">Side Hustle</option>
                    <option value="savings">Savings</option>
                    <option value="stocks">Stocks</option>
                    <option value="bank">Bank</option>
                    <option value="others">Others</option>
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
                    name={'Add Expense'}
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
`;

export default ExpenseForm;
