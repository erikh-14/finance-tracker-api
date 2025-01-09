import React, { useMemo, useState} from 'react';
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard'
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';


function App() {
  const [active, setActive] = useState(1);
  
  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1: 
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default: 
      return <Dashboard/>
    }
  }

  const orbMemo = useMemo(() =>{
    return <Orb/>
    }, [])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
     
     <Navigation active={active} setActive={setActive}/>
      <main>
      {displayData()}
      </main>
      
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

  main{
    flex: 1;
    background-color: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
}
`;

export default App;
