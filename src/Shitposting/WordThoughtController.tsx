import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';
import WordThought from "./WordThought";
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

type WordControllerProps = {
  rand: SeededRandom,
  fileList: string[],
  clickAction?: Action;
}

const WordThoughtController = (props:WordControllerProps)=> {
  const chunks:string[] = [];
  const {fileList, rand, clickAction} = props;
  let text = "";

  const calcClick = (index:number, length: number) =>{
    return (Math.floor(length/3) % index === 0);
  }

  const chunkText = () =>{
    rand.nextDouble();//eat a seed;
    const num_chunks = rand.getRandomNumberBetween(5,19);
    let size = Math.floor(text.length/num_chunks);

    for (let o = 0; o < text.length -1; o += size) {
        chunks.push(text.substr(o, size));
        size = rand.getRandomNumberBetween(19,Math.floor(text.length/num_chunks));
    }
  }

  //TODO only do this after file loaded
  chunkText();
  //TODO this is currently broken waiting on online file shit
  console.log("JR NOTE: TODO",fileList);
  return (
    <Fragment>
      {chunks.map((word, index) => (
        <WordThought shouldClick={calcClick(index, chunks.length)} clickAction={calcClick(index, chunks.length)?clickAction: undefined} key={"word"+index} text={word} rand={rand}></WordThought>
    ))}
    </Fragment>
  );
}

export default WordThoughtController;
