import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import { Action } from '../utils/Types';


type ClickableProps = {
  shouldClick: boolean,
  rand: SeededRandom
}

const ClickableBullshit = styled.div<ClickableProps>`
  color: white;
  cursor: ${props => props.shouldClick? 'pointer': 'auto'};
  position: ${props => props.rand.getRandomElementFromArray(["fixed","absolute","relative"])};
  top: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  left: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  text-align: ${props => props.rand.getRandomElementFromArray(["left","right","center"])};
  font-size: ${props => `${props.rand.getRandomNumberBetween(12,48)}px`};
  padding: ${props => `${props.rand.getRandomNumberBetween(3,30)}px`};
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
      <ClickableBullshit className={shouldClick?'pulse_animated':'not-link'} rand={rand} shouldClick={shouldClick} onClick={()=>{return clickAction?clickAction():null}}>{text} </ClickableBullshit>
    </Fragment>
  );
}

export default WordThought;
