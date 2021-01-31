import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import { Action } from '../utils/Types';

const Bullshit = styled.div `
  color: blue;
`;

type ClickableProps = {
  onClick?: Action
}

const ClickableBullshit = styled.div<ClickableProps>`
  color: ${props => props.onClick? 'red': 'blue'};
  cursor: ${props => props.onClick? 'pointer': 'auto'};

`;

type WordProps = {
  rand: SeededRandom,
  text: string
  clickAction?: Action;
}

const WordThought = (props:WordProps)=> {
  const {text, rand, clickAction} = props;
  return (
    <Fragment>
      <ClickableBullshit onClick={()=>{return clickAction?clickAction():null}}>{text} {rand.getRandomNumberBetween(1,100)}</ClickableBullshit>
    </Fragment>
  );
}

export default WordThought;
