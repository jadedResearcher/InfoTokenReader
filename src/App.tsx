import './App.css';
import SeededRandom from './utils/SeededRandom';
import styled from '@emotion/styled';

const TestDiv = styled.div `
  color: red;
`;

function App() {
  const rand = new SeededRandom(19);
  return (
    <div className="App">
      <TestDiv>JR Level Bullshit {rand.getRandomNumberBetween(1,19)} {rand.getRandomNumberBetween(1,19)} {rand.nextDouble()}</TestDiv>
    </div>
  );
}

export default App;
