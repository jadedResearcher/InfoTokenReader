import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import WordThought from "./WordThought";
import PictureThought from "./PictureThought";
import {Fragment} from 'react';

const TestDiv = styled.div `
  color: red;
`;

function ShitpostRoot() {
  const rand = new SeededRandom(19);
  const test_words = ["hello world","its jr here","whatup"];
  const test_images = ["PicturesThoughts/beastiary/4.png"];

  return (
    <Fragment>
      {test_words.map((word, index) => (
        <WordThought text={word} rand={rand}></WordThought>
    ))}
    {test_images.map((src, index) => (
        <PictureThought src={src} rand={rand}></PictureThought>
    ))}
    </Fragment>
  );
}

export default ShitpostRoot;
