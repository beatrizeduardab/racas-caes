import React from 'react';
import styled from 'styled-components';
import Dogs from './components/Dogs';

const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
  background-color:rgb(8, 8, 8);
  padding: 20px;
  text-align: center;
  color: #333;
`;


function App() {
  return (
    <AppContainer>
      <h1>Bem-vindo ao Dogs</h1>
      <Dogs />
    </AppContainer>
        
  );
}

export default App;
