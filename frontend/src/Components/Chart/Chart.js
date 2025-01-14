import React from "react";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

// Register Chart.js components
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: "Income",
                data: incomes.map((income) => income.amount),
                backgroundColor: "green",
                borderColor: "green",
                fill: false,
                tension: 0.2, // Smooth line
            },
            {
                label: "Expenses",
                data: expenses.map((expense) => expense.amount),
                backgroundColor: "red",
                borderColor: "red",
                fill: false,
                tension: 0.2, // Smooth line
            },
        ],
    };

    const options = {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows chart to resize with its container
        plugins: {
            legend: {
                display: true,
                position: "top", // Position the legend at the top
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Y-axis starts at zero
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background-color: #fcf6f9;
    border: 3px solid #ffffff;
    border-radius: 32px;
    padding: 1rem;
    height: 100%; // Allow the chart to fill parent container
    display: flex; // Use flexbox to align content
    justify-content: center;
    align-items: center;
`;

export default Chart;
