import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import { Action } from '../utils/Types';
import { root,picture_thoughts } from '../utils/consts';


type ClickableProps = {
  rand: SeededRandom
}

const ClickableBullshit = styled.img<ClickableProps>`
  color: white;
  cursor: pointer;
  position: ${props => props.rand.getRandomElementFromArray(["fixed","absolute","relative"])};
  top: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  left: ${props => `${props.rand.getRandomNumberBetween(0,1000)}px`};
  text-align: ${props => props.rand.getRandomElementFromArray(["left","right","center"])};
  font-size: ${props => `${props.rand.getRandomNumberBetween(12,48)}px`};
  padding: ${props => `${props.rand.getRandomNumberBetween(3,30)}px`};
`;

type PictureProps = {
  rand: SeededRandom,
  src: string,
  search_term: string,
  clickAction: Action
}

const PictureThought = (props:PictureProps)=> {
  const {src, rand, clickAction, search_term} = props;
  const url=root + picture_thoughts + "/" +search_term + "/" + src;

  console.log("JR NOTE: i'm a picture thought and my src is ", url)
  return (
    <Fragment>
      <ClickableBullshit src={url} className={'pulse_animated'} rand={rand} onClick={()=>{return clickAction()}}/>
    </Fragment>
  );
}

export default PictureThought;
