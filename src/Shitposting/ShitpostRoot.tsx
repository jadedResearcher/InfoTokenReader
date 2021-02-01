import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import WordThoughtController from "./WordThoughtController";
import PictureThought from "./PictureThought";
import {useState, useEffect, Fragment} from 'react';
import FileUtil from "../utils/FileUtil";
const TestDiv = styled.div `
  color: red;
`;

function ShitpostRoot() {
  const test_images = ["PicturesThoughts/beastiary/4.png"];
  let search_term = "beastiary"
  const [rand, setRand] = useState<SeededRandom>(new SeededRandom(19));
  const [seed, setSeed] = useState(19);


  const clickAction = ()=>{
    console.log("JR NOTE, changing seed");
    setSeed(rand.getRandomNumberBetween(0, 1013904223))
  };

  const fileUtil = new FileUtil(rand,clickAction, search_term);


  useEffect(() =>{
    console.log("JR NOTE: using effect", seed);
    setRand(new SeededRandom(seed));
  },[seed, setRand]);

  if(!fileUtil.folder_json){
    <div>loading</div>
  }else{
  return (
      <Fragment>
        <WordThoughtController rand={rand} clickAction={clickAction} fileList={fileUtil.word_file_list}></WordThoughtController>
      {test_images.map((src, index) => (
          <PictureThought key={"pic"+index} src={src} rand={rand}></PictureThought>
      ))}
      </Fragment>
    );
  }
}

export default ShitpostRoot;
