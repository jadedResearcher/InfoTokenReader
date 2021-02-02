import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import { Action } from '../utils/Types';

const Bullshit = styled.div `
  color: blue;
`;

type ClickableProps = {
  shouldClick: boolean,
  rand: SeededRandom
}

const ClickableBullshit = styled.div<ClickableProps>`
  color: ${props => props.shouldClick? 'red': 'blue'};
  cursor: ${props => props.shouldClick? 'pointer': 'auto'};
  position: ${props => props.rand.getRandomElementFromArray(["fixed","absolute","relative"])};
  top: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  left: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  text-align: ${props => props.rand.getRandomElementFromArray(["left","right","center"])};
  font-size: ${props => `${props.rand.getRandomNumberBetween(12,48)}px`};
`;

type WordProps = {
  rand: SeededRandom,
  text: string
  clickAction?: Action;
  shouldClick: boolean;
}

const WordThought = (props:WordProps)=> {
  const {text, rand, clickAction, shouldClick} = props;
  return (
    <Fragment>
      <ClickableBullshit rand={rand} shouldClick={shouldClick} onClick={()=>{return clickAction?clickAction():null}}>{text} </ClickableBullshit>
    </Fragment>
  );
}

export default WordThought;
