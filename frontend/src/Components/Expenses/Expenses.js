import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseForm from "./ExpenseForm";
import IncomeItem from "../IncomeItem/IncomeItem";

function Expenses() {
    const { getExpenses, expenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses(); // Fetch expenses on component mount
    }, [getExpenses]);

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">
                    Total Expenses: <span>${totalExpenses()}</span>
                </h2>
                <div className="expenses-content">
                    {/* Expense Form */}
                    <div className="form-container">
                        <ExpenseForm />
                    </div>

                    {/* Expense List */}
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description } = expense;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    amount={amount}
                                    date={date}
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
        </ExpensesStyled>
    );
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-expenses {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red) !important;
        }
    }

    .expenses-content {
        display: flex;
        gap: 2rem;

        .form-container {
            flex: 1;
        }

        .incomes {
            flex: 2;
        }
    }
`;

export default Expenses;
