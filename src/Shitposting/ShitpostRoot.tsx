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
  const [loaded, setLoaded] = useState(false);
  const [word_file_list, setWordFileList] = useState<string[]>([]);
  const [pic_file_list, setPicFileList] = useState<string[]>([]);
  const [sound_file_list, setSoundFileList] = useState<string[]>([]);


  const clickAction = ()=>{
    console.log("JR NOTE, changing seed");
    setSeed(rand.getRandomNumberBetween(0, 1013904223))
  };

  const fileUtilCallback = (word_list:string[], pic_list:string[], sound_list:string[])=>{
    console.log("file util says its done", word_list.length, word_list);
    setWordFileList(word_list);
    setPicFileList(pic_list);
    setSoundFileList(sound_list);
    setLoaded(true);
  };

  useEffect(() =>{
    new FileUtil(rand,fileUtilCallback, search_term)
  },[]);

  useEffect(() =>{
    console.log("JR NOTE: using effect to change rand", seed);
    setRand(new SeededRandom(rand.getRandomNumberBetween(0,4294967296)));
  },[seed]);


  if(!loaded){
    return <div>loading</div>
  }else{
  return (
      <Fragment>
        <WordThoughtController search_term={search_term} rand={rand} clickAction={clickAction} fileList={word_file_list}></WordThoughtController>
      {test_images.map((src, index) => (
          <PictureThought key={"pic"+index} src={src} rand={rand}></PictureThought>
      ))}
      </Fragment>
    );
  }
}

export default ShitpostRoot;
