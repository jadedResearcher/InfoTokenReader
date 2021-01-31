import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';

const Bullshit = styled.div `
  color: blue;
`;

type WordProps = {
  rand: SeededRandom,
  text: string
}

const WordThought = (props:WordProps)=> {
  return (
    <div className="App">
      <Bullshit>text ${props.rand.nextDouble()}</Bullshit>
    </div>
  );
}

export default WordThought;
