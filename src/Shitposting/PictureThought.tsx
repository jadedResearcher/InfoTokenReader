import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment, RefObject, SyntheticEvent, useRef} from 'react';
import { Action } from '../utils/Types';
import { root,picture_thoughts } from '../utils/consts';
import deep_fry_options from "../utils/DeepFryer";

type ClickableProps = {
  rand: SeededRandom
  ref: RefObject<HTMLImageElement>;
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
  const imageRef = useRef<HTMLImageElement>(null);

  
const deepfriedCanvas = (img: HTMLImageElement) =>{
  const nextSeed = rand.getRandomNumberBetween(0,1013904223);
  img.crossOrigin = "Anonymous";
  const canvas: HTMLCanvasElement = document.createElement("CANVAS") as HTMLCanvasElement;
  var ctx = canvas.getContext('2d');
  if(!ctx){
    console.error("Uh. Why isn't there a canvas???");
    return;
  }
  const width = rand.getRandomNumberBetween(100,400);
  const height = rand.getRandomNumberBetween(100,400);
  canvas.setAttribute("width",`${width}`);
  canvas.setAttribute("height",`${height}`);
  ctx.drawImage(img, 0, 0,width,height);
  const num_layers = rand.getRandomNumberBetween(1,4);
  for(let i = 0; i<num_layers; i++){
      deep_fry_options[rand.getRandomNumberBetween(0,deep_fry_options.length-1)](canvas);
  }
  img.setAttribute("src","bullshit.png");
}

  const deepFry = (event: SyntheticEvent)=>{
    console.log("image loaded, event is", event);
    if(imageRef.current){
      deepfriedCanvas(imageRef.current);
    }
  }

  console.log("JR NOTE: i'm a picture thought and my src is ", url)
  return (
    <Fragment>
      <ClickableBullshit ref={imageRef} onLoad={deepFry} src={url} className={'pulse_animated'} rand={rand} onClick={()=>{return clickAction()}}/>
    </Fragment>
  );
}

export default PictureThought;
