import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment, RefObject, useRef, useState, useEffect} from 'react';
import { Action } from '../utils/Types';
import { root,picture_thoughts } from '../utils/consts';
import deep_fry_options from "../utils/DeepFryer";

type ClickableProps = {
  rand: SeededRandom
  ref: RefObject<HTMLCanvasElement>;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);


  
const deepfriedCanvas = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
  const nextSeed = rand.getRandomNumberBetween(0,1013904223);
  img.crossOrigin = "Anonymous";
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
}

const updateCanvas =(canvas: HTMLCanvasElement,current_src:string) =>{
  console.log("JR NOTE: updateCanvas, canvasRef.current is", canvas);
  const ctx = canvas.getContext('2d');
  if(!ctx){
    console.log("JR NOTE: returning cuz no canvas")
    return;
  }

  var img = new Image();
  img.src = root  + picture_thoughts + "/" + search_term + "/" + current_src;
  console.log("JR NOTE: made new image with src", img.src);
  img.onload = ()=> {
    console.log("JR NOTE: image has loaded")
      deepfriedCanvas(img, canvas);
    }
}

useEffect(() =>{
    console.log("JR NOTE: going to update canvas");
    if(canvasRef.current){
    updateCanvas(canvasRef.current, src);
    }
}, [canvasRef, src])




  console.log("JR NOTE: i'm a picture thought and my src is ", url)
  return (
    <Fragment>
      <ClickableBullshit width="400" height="400" ref={canvasRef} className={'pulse_animated'} rand={rand} onClick={()=>{return clickAction()}}/>
    </Fragment>
  );
}

export default PictureThought;
