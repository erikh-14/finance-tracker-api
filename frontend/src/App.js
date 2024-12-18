import React, {useMemo, useState} from 'react';
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'

function App() {
  const [active, setActive] = React.useState(1)
  
  const orbMemo = useMemo(() =>{
    return <Orb/>
    }, [])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
     
     <Navigation active={active} setActive={setActive}/>

      
    </MainLayout>
  </AppStyled>

  );
}
const AppStyled = styled.div`

height: 100vh; /* Ensures the app fills the viewport */
  background-image: url(${props => props.bg});
  background-size: cover; /* Adjust as needed for your background image */
  background-position: center;
  position: relative;
  display: flex; /* Flex ensures children align properly */

`;

export default App;
