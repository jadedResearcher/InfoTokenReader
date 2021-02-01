import { callbackify } from 'util';
import SeededRandom from './SeededRandom';
import {FileCallback} from './Types';
import {word_thoughts, image_thoughts, audio_thoughts, folder_index} from './consts';
export default class FileUtil{
    rand: SeededRandom;
    folder_json:any;
    search_term: string;
    word_file_list:string[] = [];
    callback: FileCallback;

    constructor(rand: SeededRandom, callback: FileCallback, search_term:string) {
        console.log("JR NOTE: creating a file util ");
        this.rand = rand;
        this.search_term = search_term;
        this.callback = callback;
        this.fetchJSON();
    }

    fetchJSON= ()=>{
        console.log("JR NOTE: fetching json");
        const Http = new XMLHttpRequest();
        const url=folder_index;
        Http.open("GET", url);
        Http.send();
        const that = this;

        Http.onreadystatechange = function() {
            if((this.readyState ==4 && this.status == 200)){
                console.log("JR NOTE: got response");
                that.folder_json = JSON.parse(Http.responseText)["folders"];
                console.log("JR NOTE: folder json", that.folder_json);
                that.callback(that.folder_json[word_thoughts]["files"],that.folder_json[image_thoughts]["files"],that.folder_json[audio_thoughts]["files"]);
            }
        }
    }

}

