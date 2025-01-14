import React from "react";  
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function History() {
    
    const {transactionHistory} = useGlobalContext();

    const [...history] = transactionHistory()
    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const {_id, title, amount, type} = item
                return <div key={_id} className="history-item">
                      {/* Title with color logic */}
                      <p
                            style={{
                                color: type === "income" ? "var(--color-green)" : "red",
                            }}
                        >
                            {title}
                        </p>
                        {/* Amount with color logic */}
                        <p
                            style={{
                                color: type === "income" ? "var(--color-green)" : "red",
                            }}
                        >
                            {type === "income" ? `+$${amount}` : `-$${amount}`}
                            
                        </p>
                    </div>   
            }) }
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Increased gap between history items */

    h2 {
        margin-bottom: 1rem; /* Adds spacing after the Recent History heading */
    }

    .history-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History