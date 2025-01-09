import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";

function Button({name, icon, onClick, bg, bPad, bRad, color}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color
        }} onClick={onClick}>
            {icon}
            {name}
            
            
        
        </ButtonStyled>
    )

}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all 0.4s ease;
`;



export default Button