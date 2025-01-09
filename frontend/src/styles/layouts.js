import styled from "styled-components";


export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    align-items: stretch;

`;


export const InnerLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    height: 100vh; /* Full viewport height for inner layout */
    position: relative;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
`;