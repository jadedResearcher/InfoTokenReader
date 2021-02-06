import {useEffect, useState} from 'react';

function binaryToWords(str:string) { 
  if(str.match(/[10]{8}/g)){
      var wordFromBinary = str.match(/([10]{8}|\s+)/g)?.map(function(fromBinary){
          return String.fromCharCode(parseInt(fromBinary, 2) );
      }).join('');
      return wordFromBinary;
  }
}


//TODO have this only if mode=42
function Translator() {
  const [value, setValue] = useState("");
  const [translation, setTranslation] = useState("Thinking...");

  useEffect(()=>{
    let ret:string[] = [];
    //let alphabet = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const arrayOfLines = value.match(/[^\r\n]+/g);
    if(!arrayOfLines){
      return;
    }
    
    for(let i = 0; i<arrayOfLines.length; i++){
      const line = arrayOfLines[i];
      let translated_line:string[] = [];
      if(line.length > 1){
        for(let l = 0; l<line.length; l++){
          //parseInt(input).toString(2);
          //9 is tab, 32 is space.
          translated_line.push(line.charCodeAt(l)==9?"1":"0");
        }
              //const answer = binaryToWords(translated_line.join(""));
        const answer = false;
        if(answer){
          ret.push(answer);
        }else{
          ret.push(translated_line.join(""));
        }
      }

    }
    console.log("number of lines: ", ret.length)
    setTranslation(ret.join("\n"));
  }, [value, setTranslation]);


  return (
    <div >
      <textarea onChange={(e)=> setValue(e.target.value)}></textarea>
      Translation: <textarea value={translation}></textarea>
    </div>
  );
}

export default Translator;
