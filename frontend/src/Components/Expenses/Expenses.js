import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseForm from "../Expenses/ExpenseForm";
import IncomeItem from "../IncomeItem/IncomeItem";
import Income from "../Income/Income";

function Expense() {
    const { incomes, getExpenses, expenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses(); // Fetch expenses on component mount
    }, [getExpenses]);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">Total Expenses: <span>${totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                    {expenses.map((income) => {
                            const { _id, type, title, amount, date, category, description } = income;
                            return <IncomeItem 
                            key={_id} 
                            id={_id} 
                            title={title} 
                            amount={amount} 
                            date={date} 
                            type={type}
                            category={category} 
                            description={description}
                            indicatorColor={"var(--color-green)"}
                            deleteItem={deleteExpense} />;

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

export default Expense;
