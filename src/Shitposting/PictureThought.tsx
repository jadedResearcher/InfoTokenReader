import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment, RefObject, useRef, useState, useEffect} from 'react';
import { Action } from '../utils/Types';
import { root,picture_thoughts } from '../utils/consts';
import deep_fry_options from "../utils/DeepFryer";

type ClickableProps = {
  rand: SeededRandom
  ref: RefObject<HTMLDivElement>;
}


const ClickableBullshit = styled.canvas<ClickableProps>`
  color: white;
  cursor: pointer;
  position: ${props => props.rand.getRandomElementFromArray(["fixed","absolute","relative"])};
  top: ${props => `${props.rand.getRandomNumberBetween(0,100)}%`};
  left: ${props => `${props.rand.getRandomNumberBetween(0,100)}%`};
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
  const onScreenRef = useRef<HTMLDivElement>(null);
  const canvasElement = document.createElement('canvas');
  canvasElement.setAttribute("width","400");
  canvasElement.setAttribute("height","400");


  
const deepfriedCanvas = (div: HTMLDivElement, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
  const nextSeed = rand.getRandomNumberBetween(0,1013904223);
  img.crossOrigin = "Anonymous";
  var ctx = canvas.getContext('2d');
  const bgElement = document.createElement('canvas');
  var bgctx = bgElement.getContext('2d');
  if(!ctx || ! bgctx){
    console.error("Uh. Why isn't there a canvas???");
    return;
  }
  const width = rand.getRandomNumberBetween(100,400);
  const height = rand.getRandomNumberBetween(100,400);
  


  canvas.setAttribute("width",`${width}`);
  canvas.setAttribute("height",`${height}`);
  div.setAttribute("width",`${width}px`);
  div.setAttribute("height",`${height}px`);
  bgElement.setAttribute("width",`${width*2}px`);
  bgElement.setAttribute("height",`${height}px`);



  ctx.drawImage(img, 0, 0,width,height);
  const num_layers = rand.getRandomNumberBetween(1,4);

  //deep fry it once
  for(let i = 0; i<num_layers; i++){
      deep_fry_options[rand.getRandomNumberBetween(0,deep_fry_options.length-1)](canvas);
  }
  //draw it to the first part of the bg
  bgctx.drawImage(canvas, 0,0);
  //deep fry it again
  for(let i = 0; i<num_layers; i++){
    deep_fry_options[rand.getRandomNumberBetween(0,deep_fry_options.length-1)](canvas);
  }
  //draw it to the second part
  bgctx.drawImage(canvas, 0,width);

  div.style.backgroundImage = `url(${bgElement.toDataURL()})`;
}

const updateCanvas =(div: HTMLDivElement, current_src:string) =>{
  const ctx = canvasElement.getContext('2d');
  if(!ctx){
    return;
  }

  var img = new Image();
  img.src = root  + picture_thoughts + "/" + search_term + "/" + current_src;
  img.onload = ()=> {
    deepfriedCanvas(div, img, canvasElement);
  }
}

useEffect(() =>{
  if(onScreenRef.current){
    updateCanvas(div, src);
  }

}, [src])




  return (
    <Fragment>
      <ClickableBullshit width="400" height="400" ref={onScreenRef} className={'pulse_animated, frameAnimation'} rand={rand} onClick={()=>{return clickAction()}}/>
    </Fragment>
  );
}

export default PictureThought;
