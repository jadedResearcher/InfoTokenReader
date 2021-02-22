
import {useState, useEffect} from 'react';
import {getRandomNumberBetween} from '../utils/NonSeededRandUtils';

function LoopTool() {
    //const [sources, setSources] = useState(["I worry about my agents, IA and RP.  Both seem to be delving deeper into mirror corruption. Their mandatory small talk has been increasingly referential. I understand that I am abnormally good at communicating via letters, but I did not expect them to get worse even with Novel Input. Your help with Jaimie may be the only thing that can save us...","I continue to be thankful for your friendship, both to me, and to my people. We have much to learn about the Outside world, and I know that with your help, we will learn it.", "the fox and the hens", "then there is no more", "and never forget there is nothing else"]);
    const [sources, setSources] = useState(["To use this tool, what you want to do is put big chunks of text into each text input. It will help if the chunks of text share words in common. The system will try to stitch the content together on words they share together, or, failing that, in small snippets, preferring sentence boundaries.","the chunks of text will be most readable in the begining, and more fragmented as time goes on. ","It's not a perfect tool, of course its not. But I think it works most of the time. It's a system I'm proud of. I will probably tweak the algorithm later."]);
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

        if(splitSources.length === 0){
            console.log("JR NOTE: ending because no more sources");
            return tmp_output;
        }
        //pick how many words to grab. 
        const chunkSize = getRandomNumberBetween(10,20);
        let new_index = 0;
        let found_new_source = false;

        let new_tmp_output = tmp_output + " " + splitSources[current_source_index].splice(0,chunkSize).join(" ");
        let padding_word_count = 0;
        if(splitSources[current_source_index].length > 0){
            //theres more words, so go through them all till you find one that is in common with other things.
            for(let split_index = 0; split_index< splitSources[current_source_index].length; split_index++ ){
                let word = splitSources[current_source_index][split_index];
                padding_word_count ++;
                for(let i = 0; i<splitSources.length; i++){
                    if(i != current_source_index){ //skip the one we're already in
                        const found_index = splitSources[i].indexOf(word);
                        if(found_index != -1){
                            new_index = i;
                            found_new_source = true;
                            break;
                        }
                    }
                }
                if(found_new_source || (padding_word_count > 40)) {
                    break;
                }
            }
        }else{
            console.log("JR NOTE: current source is empty, ",current_source_index, splitSources );
        }
        const new_chunk = splitSources[current_source_index].splice(0,padding_word_count).join(" ");
        console.log("JR NOTE: DEBUG SPLIT:  new chunk is", new_chunk, "padding was ", padding_word_count);

        new_tmp_output = new_tmp_output + " " + new_chunk;
    


        //before you call it again do this.
        let viable_sources = splitSources.filter((source) => source.length != 0);
        if(!found_new_source){
            new_index = getRandomNumberBetween(0, viable_sources.length-1);
        }

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

    const setValue = (text: string, index: number) =>{
        let tmp_copy = [...sources];
        tmp_copy[index] = text;
        setSources(tmp_copy);
    }



    return (
        <table>
            <tbody>
                <tr><td>Input Sources:<br/> {sources.map((x,index) => <textarea onChange={(e)=> setValue(e.target.value, index)} key ={"tool"+index} defaultValue={x}></textarea>) }
                <br/>
                <button onClick={(e)=> setValue("",sources.length+1)} >Add Source</button>
                </td>
                <td>Output:<br/> <textarea key ={"outputool"} value={output}></textarea></td></tr>
            </tbody>
        </table>
    )

}
export default LoopTool;

