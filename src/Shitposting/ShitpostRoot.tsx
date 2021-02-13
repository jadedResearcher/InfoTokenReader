import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import WordThoughtController from "./WordThoughtController";
import PictureThoughtController from "./PictureThoughtController";
import {useState, useEffect, Fragment} from 'react';
import { root,audio_thoughts } from '../utils/consts';
import {getRandomElementFromArray} from '../utils/NonSeededRandUtils';
import FileUtil from "../utils/FileUtil";
const TestDiv = styled.div `
  color: red;
`;

function ShitpostRoot() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let search_term = "beastiary";
  const possible_search_terms = ["beastiary", "pink", "yellow", "qq"];
  const tmp_term = urlParams.get('search_term');
  if(tmp_term){
    search_term = tmp_term;
  }else{
    search_term = getRandomElementFromArray(possible_search_terms);
    document.location.search = `?search_term=${search_term}`;
  }
  const [rand, setRand] = useState<SeededRandom>(new SeededRandom(13));
  const [seed, setSeed] = useState(19);
  const [loaded, setLoaded] = useState(false);
  const [word_file_list, setWordFileList] = useState<string[]>([]);
  const [pic_file_list, setPicFileList] = useState<string[]>([]);
  const [sound_file_list, setSoundFileList] = useState<string[]>([]);

  const randomSound = () =>{
    const file = rand.getRandomElementFromArray(sound_file_list);
    console.log("chosen file ", file);
    const url=root + audio_thoughts + "/" + file;
    const audioElement = new Audio(url);
    audioElement.play();
}


  const clickAction = ()=>{
    console.log("JR NOTE, changing seed");
    randomSound();
    setSeed(rand.getRandomNumberBetween(0, 1013904223))
  };

  const fileUtilCallback = (word_list:string[], pic_list:string[], sound_list:string[])=>{
    console.log("file util says its done", word_list.length, word_list);
    setWordFileList(word_list);
    setPicFileList(pic_list);
    console.log("sound list is " , sound_list)
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
        <PictureThoughtController search_term={search_term} rand={rand} clickAction={clickAction} fileList={pic_file_list}></PictureThoughtController>

      </Fragment>
    );
  }
}

export default ShitpostRoot;
