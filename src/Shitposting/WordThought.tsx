import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import { Action } from '../utils/Types';

const Bullshit = styled.div `
  color: blue;
`;

type ClickableProps = {
  shouldClick: boolean
}

const ClickableBullshit = styled.div<ClickableProps>`
  color: ${props => props.shouldClick? 'red': 'blue'};
  cursor: ${props => props.shouldClick? 'pointer': 'auto'};
  background: ${props => {
    console.log("JR NOTE: in style, props is", props);
    return props.shouldClick? 'pointer': 'auto'}
  }

`;

type WordProps = {
  rand: SeededRandom,
  text: string
  clickAction?: Action;
  shouldClick: boolean;
}

const WordThought = (props:WordProps)=> {
  const {text, rand, clickAction, shouldClick} = props;
  console.log("JR NOTE: should click is", shouldClick, "and clickaction is", clickAction);
  return (
    <Fragment>
      <ClickableBullshit shouldClick={shouldClick} onClick={()=>{return clickAction?clickAction():null}}>{text} {rand.getRandomNumberBetween(1,100)}</ClickableBullshit>
    </Fragment>
  );
}

export default WordThought;
