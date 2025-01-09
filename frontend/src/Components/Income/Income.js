import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";

function Income() {
    const { addIncome, getIncomes, incomes } = useGlobalContext();

    // Fetch incomes when the component mounts
    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        <h2>Income List</h2>
                        {incomes && incomes.length > 0 ? ( // Check if incomes exists and has length
                            <ul>
                                {incomes.map((income) => (
                                    <li key={income._id} className="income-item">
                                        <div className="details">
                                            <h3>{income.title}</h3>
                                            <p>${income.amount}</p>
                                        </div>
                                        <p className="description">{income.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{incomes ? 'No incomes available.' : 'Loading incomes...'}</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    .income-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem;
    }

    .form-container {
        flex: 1;
        min-width: 300px;
    }

    .incomes {
        flex: 3;
        background: rgba(252, 246, 249, 0.8);
        border: 2px solid #ddd;
        border-radius: 12px;
        padding: 1.5rem;
        font-size: 1rem;
        width: 100%;
        overflow: auto;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        .income-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem;
            border-bottom: 1px solid #ddd;

            .details {
                display: flex;
                justify-content: space-between;

                h3 {
                    font-size: 1.2rem;
                    margin: 0;
                }

                p {
                    font-size: 1.1rem;
                    color: #555;
                }
            }

            .description {
                font-size: 0.9rem;
                color: #777;
            }
        }
    }
`;

export default Income;
