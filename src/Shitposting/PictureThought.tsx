import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment} from 'react';

const Bullshit = styled.div `
  color: green;
`;

type ImageProps = {
  rand: SeededRandom,
  src: string
}

const PictureThought = (props:ImageProps)=> {
  const {src, rand} = props;

  return (
    <Fragment>
      <Bullshit>{src}</Bullshit>
    </Fragment>
  );
}

export default PictureThought;

