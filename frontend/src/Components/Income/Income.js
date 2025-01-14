import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { plus } from "../../utils/Icons";

function Income() {
    const { addIncome, getIncomes, incomes, deleteIncome, totalIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        getIncomes(); // Fetch incomes on component mount
    }, [getIncomes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addIncome(inputState);
        setInputState({
            title: "",
            amount: "",
            date: null,
            category: "",
            description: "",
        });
    };

    const handleInput = (name) => (event) => {
        const value = name === "amount" ? parseFloat(event.target.value) : event.target.value;
        setInputState({ ...inputState, [name]: value });
        setError("");
    };

    const categories = [
        { value: "salary", label: "Salary" },
        { value: "freelancing", label: "Freelancing" },
        { value: "investments", label: "Investments" },
        { value: "side-hustle", label: "Side Hustle" },
        { value: "savings", label: "Savings" },
        { value: "stocks", label: "Stocks" },
        { value: "bank", label: "Bank" },
        { value: "others", label: "Others" },
    ];

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form
                            handleSubmit={handleSubmit}
                            handleInput={handleInput}
                            inputState={inputState}
                            error={error}
                            buttonText="Add Income"
                            titlePlaceholder="Income Title"
                            amountPlaceholder="Income Amount"
                            categories={categories}
                            icon={plus}
                        />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, type, title, amount, date, category, description } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    description={description}
                                    indicatorColor={"var(--color-green)"}
                                    deleteItem={deleteIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
`;

export default Income;
