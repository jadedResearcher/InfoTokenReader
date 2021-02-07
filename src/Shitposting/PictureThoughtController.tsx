import SeededRandom from '../utils/SeededRandom';
import styled from '@emotion/styled';
import {Fragment, useEffect, useState} from 'react';
import PictureThought from "./PictureThought";
import { Action } from '../utils/Types';
import {root, picture_thoughts} from '../utils/consts';




type WordControllerProps = {
  rand: SeededRandom,
  fileList: string[],
  search_term: string,
  clickAction: Action;
}

const PictureThoughtController = (props:WordControllerProps)=> {
  const [srcList,setSrcList] = useState<string[]>([]);
  const {fileList, rand, clickAction, search_term} = props;
  let text = "";
  
  
const shitPostPic =()=>{
  const max = rand.getRandomNumberBetween(1,3);
  let tmp = [];
  for(let i = 0; i<max; i++){
    const file = rand.getRandomElementFromArray(fileList);
    tmp.push(file);
  }
  setSrcList(tmp);
}


  useEffect(() => {
    shitPostPic();
  },[rand]);

  return (
    <Fragment>
      {srcList.map((src, index) => (
        <PictureThought search_term={search_term} clickAction={clickAction} key={"pic"+index} src={src} rand={rand}></PictureThought>
    ))}
    </Fragment>
  );
}

export default PictureThoughtController;
