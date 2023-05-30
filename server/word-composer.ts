import * as fsPromise from 'fs'; 

 interface word {
    word:string;
    used:string;
    notUsed:string;
    needed:string;
    val:number;    
}

let dictionary: {[letter:string]: number} = 
       {
            
            'a':1, 'e':1, 'i':1 ,'n':1,'o':1, 'r':1, 's':1, 'w':1, 'z':1,            
            'c':2, 'd':2, 'k':2, 'l':2, 'm':2, 'p':2, 't':2, 'y':2,            
            'b':2, 'g':2, 'h':2, 'j':2, 'ł':2, 'u':2,            
            'ą':2, 'ę':2, 'f':2, 'ó':2, 'ś':2, 'ż':2,
            'ć':6, 'ń':7, 'ź':9
        };

function countWordVal(str:string)
        {
            let val:number = 0;

            str.split('').map((c:string) => {
                
                if (dictionary[c] != null)
                    return val += dictionary[c];
                else
                    return 0;
            })
            return val;            
        }

export async function findPossibleWords(letters:string)
{

    const filePath = 'server/slowa.txt';
    
    const fs = require('fs');
    const dictionary:Array<string> = fs.readFileSync(filePath).toString().split(/\r?\n/);
    
      
    
    
    let alfabet:Array<string> = [ 'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż', '.' ];
    let list:Array<word> = [];    
    let count:number = 0;
    
    dictionary.map((w:string) =>
    {           
        let sortedLetters:string = letters.split('').sort().join('');
        let sortedDicWord:string = w.split('').sort().join('');
        sortedLetters += ".";        
        sortedDicWord += ".";        
        let used:string = "";
        let notUsed:string = "";
        let needed:string = "";
        let match:boolean = true;

        let i:number = 0;
        let j:number = 0;
        while (i < w.length)
        {
            if (sortedLetters[j] == sortedDicWord[i])
            {
                if (sortedLetters[j] !='.')
                    {used += sortedLetters[j];}
                j++;
                i++;

            }
            if (alfabet.indexOf(sortedLetters[j]) < alfabet.indexOf(sortedDicWord[i]))
            {
                if (sortedLetters[j] != '.')
                    {notUsed += sortedLetters[j];}
                j++;

            }
            else if (alfabet.indexOf(sortedLetters[j]) > alfabet.indexOf(sortedDicWord[i]))
            {                
                if (sortedDicWord[i] != '.')
                {
                    match = false;
                    break;
                }
                /*needed += sortedDicWord[i];                            
            i++;*/
            }
        }
        if (match)
        {
            let word:word = {word:'', used:'', notUsed:'', needed:'', val:0}
            word.word = w;
            word.used = used;
            if(sortedDicWord.length < sortedLetters.length) {                
                word.notUsed = notUsed + sortedLetters.slice(j,-1);                
            }
            else { word.notUsed = notUsed; }
            word.needed = needed;
            word.val = countWordVal(w);            
            list.push(word);
            count++;
        }
    }) 
    
    console.log('sedning ' + count +' results');
    
    return JSON.stringify({words:list})
}