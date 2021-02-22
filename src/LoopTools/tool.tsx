
import {useState, useEffect, Fragment} from 'react';
import {getRandomNumberBetween} from '../utils/NonSeededRandUtils';

function LoopTool() {
    const [sources, setSources] = useState(["I worry about my agents, IA and RP.  Both seem to be delving deeper into mirror corruption. Their mandatory small talk has been increasingly referential. I understand that I am abnormally good at communicating via letters, but I did not expect them to get worse even with Novel Input. Your help with Jaimie may be the only thing that can save us...","I continue to be thankful for your friendship, both to me, and to my people. We have much to learn about the Outside world, and I know that with your help, we will learn it.", "the fox and the hens", "then there is no more", "and never forget there is nothing else"]);

    const [output, setOutput] = useState("");

    const splitSourcesIntoWords =() =>{
        let splitSources = [];
        for(let i = 0; i< sources.length; i++){
         splitSources.push(sources[i].split(" "));
        }
        return splitSources;
    }

    //yes weird recursion. each turn take 5-25 words for the current source, then keep adding words till you find the next source
    //then call yourself again. if you have no words left in any sources, quit.
    const turnSplitSourcesToOutput = (splitSources: string[][], current_source_index=0, tmp_output=""):string => {
        //if you are empty, just remove yourself entirely.
        console.log("JR NOTE: splitSources",splitSources,"current_source_index",current_source_index,"tmp_output",tmp_output);

        if(splitSources.length === 0){
            console.log("JR NOTE: ending because no more sources");
            return tmp_output;
        }
        //pick how many words to grab. 
        const chunkSize = getRandomNumberBetween(5,25);
        const new_tmp_output = tmp_output + " " + splitSources[current_source_index].splice(0,chunkSize).join(" ");

        //before you call it again do this.
        let viable_sources = splitSources.filter((source) => source.length != 0);
        let new_index = getRandomNumberBetween(0, viable_sources.length-1);

        return turnSplitSourcesToOutput(viable_sources, new_index,new_tmp_output );
    }

    useEffect(()=>{
        //take each source, and split it by words.
        //then, add the first 5-10 words (plus their punctuation) into the output. 
        // (when you add something to output, remove it from source array)
        //then, go word by word and see if any of the other sources have that word
        // if you do not find it, add it to the output and move on to the next word.
        //if you DO find it, instead add 5-10 words from that source and use it as the next word

       const splitSources = splitSourcesIntoWords();
       setOutput(turnSplitSourcesToOutput(splitSources));
    }, [sources, setOutput]);




    return (
        <Fragment>
            {sources.map((x,index) => <textarea key ={"tool"+index} defaultValue={x}></textarea>) }
            {output}
        </Fragment>
    )

}
export default LoopTool;

