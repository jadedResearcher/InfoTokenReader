import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment, useEffect, useState} from 'react';
import WordThought from "./WordThought";
import { Action } from '../utils/Types';
import {root, word_thoughts} from '../utils/consts';

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
  search_term: string,
  clickAction?: Action;
}

const WordThoughtController = (props:WordControllerProps)=> {
  const [chunks,setChunks] = useState<string[]>([]);
  const {fileList, rand, clickAction, search_term} = props;
  let text = "";

  const calcClick = (index:number, length: number) =>{
    return (Math.floor(length/3) % index === 0);
  }
  
  
const shitPostWords =()=>{
  console.log("shit post words", fileList);
  const file = rand.getRandomElementFromArray(fileList);
  console.log("JR NOTE: file chosen is", file);
  const Http = new XMLHttpRequest();
  const url=root + word_thoughts + "/" +search_term + "/" + file;
  Http.open("GET", url);
  Http.send();

      Http.onreadystatechange = function() {
          if((this.readyState ==4 && this.status == 200)){
           text = Http.responseText;
           chunkText();
          }
      }
}

  const chunkText = () =>{
    rand.nextDouble();//eat a seed;
    let tmp_chunks = [];
    const num_chunks = rand.getRandomNumberBetween(5,19);
    let size = Math.floor(text.length/num_chunks);

    for (let o = 0; o < text.length -1; o += size) {
      tmp_chunks.push(text.substr(o, size));
      size = rand.getRandomNumberBetween(19,Math.floor(text.length/num_chunks));
    }
    setChunks(tmp_chunks);
  }

  useEffect(() => {
    console.log("shit post words use effect");
    shitPostWords();
  },[]);

  return (
    <Fragment>
      {chunks.map((word, index) => (
        <WordThought shouldClick={calcClick(index, chunks.length)} clickAction={calcClick(index, chunks.length)?clickAction: undefined} key={"word"+index} text={word} rand={rand}></WordThought>
    ))}
    </Fragment>
  );
}

export default WordThoughtController;
