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
  let [search_term, setSearchTerm] = useState<string>();
  //just basic initial stuff
  const [possible_search_terms, setPossibleSearchTerms] = useState(["beastiary", "pink", "yellow", "qq"]);
  const tmp_term = urlParams.get('search_term');
  if(tmp_term && !search_term){
    setSearchTerm(tmp_term);
  }else if(!search_term){
    const tmp  = "beastiary"; //not random anymore. stable.
    setSearchTerm(tmp);
    document.location.search = `?search_term=${tmp}`;
  }

  const newTopic = () =>{
    console.log("looking for new topic in  ", possible_search_terms);
    const tmp  = rand.getRandomElementFromArray(possible_search_terms);
    setSearchTerm(tmp);
    //document.location.search = `?search_term=${tmp}`;
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
    if(rand.nextDouble() > 0.75){
      newTopic();
    }
    setSeed(rand.getRandomNumberBetween(0, 1013904223))
  };

  const fileUtilCallback = (word_list:string[], pic_list:string[], sound_list:string[], search_term_list:string[])=>{
    console.log("file util says its done",  search_term_list);
    setPossibleSearchTerms(search_term_list);
    setWordFileList(word_list);
    setPicFileList(pic_list);
    console.log("sound list is " , sound_list)
    setSoundFileList(sound_list);
    setLoaded(true);
  };

  useEffect(() =>{
    if(search_term){
      new FileUtil(rand,fileUtilCallback, search_term)
    };
  },[search_term]);

  useEffect(() =>{
    console.log("JR NOTE: using effect to change rand", seed);
    setRand(new SeededRandom(rand.getRandomNumberBetween(0,4294967296)));
  },[seed]);

 


  if(!loaded){
    return <div>loading</div>
  }else if (search_term){
  return (
      <Fragment>
        <h1>{search_term}</h1>
        <WordThoughtController search_term={search_term} rand={rand} clickAction={clickAction} fileList={word_file_list}></WordThoughtController>
        <PictureThoughtController search_term={search_term} rand={rand} clickAction={clickAction} fileList={pic_file_list}></PictureThoughtController>

      </Fragment>
    );
  }else{
    return <div>error</div>
  }
}

export default ShitpostRoot;
