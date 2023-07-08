import { useState } from 'react';


function App() {
  
  const [input,setInput] = useState("");
  const [result,setResult] = useState("");
  const [operations, setOperations] = useState([]);

  const getClassForCharacter = (character) => {
    if (character === 'A') return 'operation AC';
    if (character === '%') return 'math operetion mod';
    if (character === 'C') return 'operation C';
    if (character === '÷' ) return 'math operation division' 
    if (character === 'x') return 'math operation multiply';
    if (character === '+') return 'math operation add';
    if (character === '-') return 'math operation subtract';
    if (character === '.') return 'decimal';
    if (character === '=') return 'operation equal';
    if (character === 'D') return 'DEL';
    return `n${character}`;
  };

  const fill = (character)=>{
    if (character === "A"){
      return "AC";
    }
    if (character === "D"){
      return "DL";
    }
     return character;
    
  }

  function containsOnlyNumbers(input) {
    if (input === "") {
      return false; 
    }
    for (let i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        return false;
        break;
      }
    }
    return true;
  }
  
  
  let numbers = "AC%÷987x654+321-D0.=";
 
    const spans = numbers.split("").map((character, index) =>(
      <span key={index} className={getClassForCharacter(character)} onClick={(e)=>handleChar(character)}>{fill(character)}</span>
    )
    )
      let showme = 0;
    let op1 = 0;
    let oper = '';
    let op2 = 0;
    const ops = "+-x÷%";
    const myset = "1234567890.";
    const subs = "+-"

    function handleChar(character){
      if (result === 'Error'){
        setResult("");
      }
      if (myset.includes(character)){
        if (input.length>55){
          console.log("wtf");
          setResult("Error");
          setInput("");
          return;
        }else{
      setInput(input+character);
      return;
    }
      } 
      if (character === "D"){
        setInput(input.slice(0,-1));
        return; 
      }
      if (character === "C"){
        setInput("");
        setResult("");
        return;
      }
      if (character === "A"){
        setOperations([]);
        setResult("");
        setInput("");
        return;
      }
      if (ops.includes(character)){
          if (input !== ''){
            let temp = operations;
            temp.push(parseFloat(input));
            temp.push(character);
            setOperations(temp);
            setInput("");
        }else{
        if (operations.length !== 0){
          console.log(operations);
            let temp = operations;
          temp.push(character);
          setOperations(temp);
            setResult('');}
            else{ 
               setResult("Error");
              setInput("");
            }
        }
    }

    if (character === "="){
      if (!containsOnlyNumbers(input)){
        setResult("Error");
        setOperations([]);
        return;
      }
      let temp = operations;
      temp.push(parseFloat(input));
      setOperations(temp);
      console.log(temp);
        setInput(""); 
        let i = 0;
        while (i<temp.length){
          if (temp[i] ===  "%"){
            op1 = parseFloat(temp[i+1]);
          op2 = parseFloat(temp[i-1]);
          showme = op2 % op1;
          temp[i-1] = showme;
          temp.splice(i,2);
          setOperations(temp);
          setInput("");
          i = i-1;
      
          }
          i++
        }

        i = 0;
        while (i<temp.length){
        if (temp[i] === "x"){
          op1 = parseFloat(temp[i+1]);
          op2 = parseFloat(temp[i-1]);

          showme = op2 * op1;
          console.log(showme);
          temp[i-1] = showme;
          temp.splice(i,2);
          setOperations(temp);
          i = i-1 ;
      
        }else if (temp[i] === "÷"){
          op1 = parseFloat(temp[i+1]);
          if (op1 === 0 ){
            setOperations([]);
            setResult("Mathematical Error");
            setInput("");
            return;
          }else {
            op2 = parseFloat(temp[i-1]);

            showme = op2 / op1
            temp[i-1] = showme;
            temp.splice(i,2);
            setOperations(temp);
            
            i = i-1;
        }

        }

          i++;
        
        // else{
        //   op2 = operations.pop();
        //    showme = eval(op2 + oper + op1);
        //   setInput("");
        //   temp.push(showme);
        //   setOperations(temp);
        // }
        
      }
      i = 0 ;
      while (i<temp.length){
        if (subs.includes(temp[i])){
          op1 = parseFloat(temp[i+1]);
          op2 = parseFloat(temp[i-1]);
          showme = eval(op1 + temp[i] + op2);
          temp[i-1] = showme;
          temp.splice(i,2);
          setOperations(temp);
          
          i = i-1;

        };
        i++
      }
      setResult(`= ${operations[0]}`);
      }
    };



  return (
    <div className="App">
      <div className="calculator">
      <div className="output"> 
      <span className="input">{input}</span>
      <span className="result">{result}</span> 
      </div>
      {spans}
      </div>
    </div>
  );
}

export default App;
