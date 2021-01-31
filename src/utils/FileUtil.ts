import SeededRandom from './SeededRandom';
import {Callback} from './Types';
export default class FileUtil{
    rand: SeededRandom;
    root:string = "http://knucklessux.com/PuzzleBox/Bullshit/";
    folder_index:string = this.root + "list.php";
    word_thoughts:string = "WordThoughts";
    audio_thoughts:string = "AudioThoughts";
    image_thoughts:string = "PictureThoughts";
    folder_json:any;
    callback: Callback;

    constructor(rand: SeededRandom, callback: Callback) {
        this.rand = rand;
        this.callback = callback;
        this.fetchJSON();
    }

    fetchJSON= ()=>{
        const Http = new XMLHttpRequest();
        const url=this.folder_index;
        Http.open("GET", url);
        Http.send();
        const that = this;

        Http.onreadystatechange = function() {
            if((this.readyState ==4 && this.status == 200)){
            that.folder_json = JSON.parse{Http.responseText};
            //pickShitPostBasedOnSeed(19, folder_json);
            }
        }
    }

}

