import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import WordThoughtController from "./WordThoughtController";
import PictureThought from "./PictureThought";
import {useState, useEffect, Fragment} from 'react';

const TestDiv = styled.div `
  color: red;
`;

function ShitpostRoot() {
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

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus libero et nunc finibus, in commodo erat porta. Phasellus pellentesque vehicula volutpat. Vivamus pulvinar dui ut orci sagittis mattis. Nam rhoncus feugiat eros sed efficitur. Nulla id tellus at elit bibendum molestie. Donec maximus, purus in semper hendrerit, tortor ex ultricies dui, eu ultrices nunc purus at dui. Sed vel sem sed risus tincidunt malesuada eu nec velit. Quisque vel purus nec tellus condimentum iaculis. Nam non facilisis tellus. Suspendisse iaculis nisl in orci ornare semper.";

  return (
    <Fragment>
      <WordThoughtController rand={rand} clickAction={clickAction} text={lorem}></WordThoughtController>
    {test_images.map((src, index) => (
        <PictureThought key={"pic"+index} src={src} rand={rand}></PictureThought>
    ))}
    </Fragment>
  );
}

export default ShitpostRoot;
