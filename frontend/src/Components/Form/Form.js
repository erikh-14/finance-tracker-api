import React, { useState } from "react";
import styled from "styled-components";
import datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { useGlobalContext } from "../../context/globalContext";

function Form() {
    const {addIncome} = useGlobalContext()
    const [inputState, setInputState] = useState({

        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',


    });
    
    const {title, amount, date, category, description} = inputState;
    
    const handleInput = name => event => {
        setInputState({...inputState, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        addIncome(inputState)
    }
    return (<FormStyled>
            <div className="input-control">
                <input      
                type="text" 
                value={title} 
                name={"title"} 
                placeholder="Salary Title" 
                onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input      
                type="text" 
                value={amount} 
                name={"amount"} 
                placeholder="Salary Amount" 
                onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker      
                id='date'
                selected={date}
                placeholder="Enter A Date" 
                dateFormat={'dd/MM/yyyy'}
                onChange={(date) => setInputState({...inputState, date: date})
            }
                />
                </div>

            <div className="input-control">
                <select required value={category} name="category" onChange={handleInput('category')}>
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
            <div className="submit-btn">
                <button>Add Income</button>

            </div>
            </FormStyled>
)}



const FormStyled = styled.form`


`;
export default Form