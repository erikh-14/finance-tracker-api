import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { plus } from "../../utils/Icons";

function Expense() {
    const { addExpense, getExpenses, expenses, deleteExpense, totalExpenses, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        getExpenses(); // Fetch expenses on component mount
    }, [getExpenses]);

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

    const handleInput = (name) => (event) => {
        const value = name === "amount" ? parseFloat(event.target.value) : event.target.value;
        setError('');
        return value;
    };

    const categories = [
        { value: "education", label: "Education" },
        { value: "groceries", label: "Groceries" },
        { value: "health", label: "Health" },
        { value: "subscriptions", label: "Subscriptions" },
        { value: "takeaways", label: "Takeaways" },
        { value: "clothing", label: "Clothing" },
        { value: "traveling", label: "Traveling" },
        { value: "other", label: "Other" },
    ];

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">Total Expenses: <span>${totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <Form
                            handleSubmit={handleSubmit}
                            handleInput={handleInput}
                            inputState={inputState}
                            error={error}
                            buttonText="Add Expense"
                            titlePlaceholder="Expense Title"
                            amountPlaceholder="Expense Amount"
                            categories={categories}
                            icon={plus}
                        />
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const { _id, type, title, amount, date, category, description } = expense;
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
                                    indicatorColor={"var(--color-red)"}
                                    deleteItem={deleteExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-expenses {
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
            color: var(--color-red) !important;
        }
    }
    .expense-content {
        display: flex;
        gap: 2rem;

        .incomes {
            flex: 1;
        }
    }
`;

export default Expense;
