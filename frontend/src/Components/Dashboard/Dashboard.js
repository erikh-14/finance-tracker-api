import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import Chart from "../../Components/Chart/Chart";
import { dollar } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";
import History from "../History/History";

function Dashboard() {
    const {
        totalIncome,
        incomes,
        expenses,
        totalExpenses,
        totalBalance,
        getIncomes,
        getExpenses,
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expenses</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <div className="salary-container">
                            <div className="salary-header">
                                <p>Min</p>
                                <h2 className="salary-title">
                                    <span>Salary</span>
                                </h2>
                                <p>Max</p>
                            </div>
                            <div className="salary-item">
                                <p>{Math.min(...incomes.map((income) => income.amount))}</p>
                                <p>{Math.max(...incomes.map((income) => income.amount))}</p>
                            </div>
                        </div>
                        <div className="salary-container">
                            <div className="salary-header">
                                <p>Min</p>
                                <h2 className="salary-title">
                                    <span>Expenses</span>
                                </h2>
                                <p>Max</p>
                            </div>
                            <div className="salary-item">
                                <p>{Math.min(...expenses.map((expense) => expense.amount))}</p>
                                <p>{Math.max(...expenses.map((expense) => expense.amount))}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    padding: 2rem;

    .stats-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;

        .chart-con {
            grid-column: span 2;
            background: #fcf6f9;
            border: 2px solid #ffffff;
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            height: 400px;

            @media (min-width: 768px) {
                height: 500px;
            }

            @media (min-width: 1200px) {
                height: 600px;
            }

            .amount-con {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 2rem;

                .income,
                .expense,
                .balance {
                    background: #ffffff;
                    border: 2px solid #f0f0f0;
                    border-radius: 15px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);

                    h2 {
                        font-size: 1.2rem;
                        color: var(--color-dark);
                        margin-bottom: 0.5rem;
                    }

                    p {
                        font-size: 2rem;
                        font-weight: bold;
                        margin: 0;
                    }

                    &.balance p {
                        color: var(--color-green);
                        opacity: 0.8;
                    }
                }
            }
        }

        .history-con {
            grid-column: span 1;
            background: #fcf6f9;
            border: 2px solid #ffffff;
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

            .salary-container {
                margin-bottom: 2rem;

                .salary-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    background: #ffffff;
                    border: 2px solid #f0f0f0;
                    border-radius: 10px;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
                    margin-bottom: 1rem;

                    p {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #333333;
                        margin: 0;
                    }

                    .salary-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        text-align: center;

                        span {
                            color: #222260;
                            font-size: 1.8rem;
                        }
                    }
                }

                .salary-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: #ffffff;
                    border: 2px solid #f0f0f0;
                    border-radius: 10px;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);

                    p {
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin: 0;
                        color: #555555;
                    }
                }
            }
        }
    }

    @media (min-width: 768px) {
        .stats-con {
            grid-template-columns: repeat(3, 1fr);

            .chart-con {
                grid-column: span 2;
            }

            .history-con {
                grid-column: span 1;
            }
        }
    }

    @media (min-width: 1200px) {
        .stats-con {
            grid-template-columns: repeat(5, 1fr);

            .chart-con {
                grid-column: 1 / 4;
            }

            .history-con {
                grid-column: 4 / 6;
            }
        }
    }
`;

export default Dashboard;
