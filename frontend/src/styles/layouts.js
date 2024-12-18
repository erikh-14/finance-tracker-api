import styled from "styled-components";


export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%
    display: flex;
    gap: 2rem;

`;


export const InnerLayout = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
`;