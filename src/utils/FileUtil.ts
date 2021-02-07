import { callbackify } from 'util';
import SeededRandom from './SeededRandom';
import {FileCallback} from './Types';
import {word_thoughts, audio_thoughts, folder_index, picture_thoughts} from './consts';
export default class FileUtil{
    rand: SeededRandom;
    folder_json:any;
    search_term: string;
    word_file_list:string[] = [];
    callback: FileCallback;

    constructor(rand: SeededRandom, callback: FileCallback, search_term:string) {
        this.rand = rand;
        this.search_term = search_term;
        this.callback = callback;
        this.fetchJSON();
    }

    fetchJSON= ()=>{
        const Http = new XMLHttpRequest();
        const url=folder_index;
        Http.open("GET", url);
        Http.send();
        const that = this;

        Http.onreadystatechange = function() {
            if((this.readyState ==4 && this.status == 200)){
                that.folder_json = JSON.parse(Http.responseText)["folders"];
                const words = that.folder_json[word_thoughts]["folders"][that.search_term]["files"];
                const pics = that.folder_json[picture_thoughts]["folders"][that.search_term]["files"];
                const audio = that.folder_json[audio_thoughts]["files"]; //doesn't do search
                console.log("JR NOTE: audio is",that.folder_json[audio_thoughts] )

                that.callback(words, pics, audio);
            }
        }
    }

}

