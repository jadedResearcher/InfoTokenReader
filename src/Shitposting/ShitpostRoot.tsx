import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import WordThought from "./WordThought";
import PictureThought from "./PictureThought";
import {useState, useEffect, Fragment} from 'react';

const TestDiv = styled.div `
  color: red;
`;

function ShitpostRoot() {
  const test_words = ["hello world","its jr here","whatup","the root shouldn't have these","a wordthoughts controller should"];
  const test_images = ["PicturesThoughts/beastiary/4.png"];
  const [rand, setRand] = useState<SeededRandom>(new SeededRandom(19));

  const [seed, setSeed] = useState(19);

  const clickAction = ()=>{
    console.log("JR NOTE, changing seed");
    setSeed(rand.getRandomNumberBetween(0, 1013904223))
  };

  useEffect(() =>{
    console.log("JR NOTE: using effect", seed);
    setRand(new SeededRandom(seed));
  },[seed, setRand]);

  const calcClick = (index:number, length: number) =>{
    console.log("JR NOTE: calculating if shold click", Math.floor(length/3), index,Math.floor(length/3) % index === 0)
    return (Math.floor(length/3) % index === 0);
  }

  return (
    <Fragment>
      {test_words.map((word, index) => (
        <WordThought shouldClick={calcClick(index, test_words.length)} clickAction={calcClick(index, test_words.length)?clickAction: undefined} key={"word"+index} text={word} rand={rand}></WordThought>
    ))}
    {test_images.map((src, index) => (
        <PictureThought key={"pic"+index} src={src} rand={rand}></PictureThought>
    ))}
    </Fragment>
  );
}

export default ShitpostRoot;
