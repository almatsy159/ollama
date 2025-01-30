import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
/*
function App(){
  //let data;
  fetch("http://localhost:5000/index/"),{method:"POST",mode:"cors"}.then(response => {
    if (response.ok) {
      return response.json(); // Parse JSON if status is 200-299
    } else {
      // Handle specific response codes
      switch (response.status) {
        case 400:
          throw new Error('Bad Request: The request was invalid.');
        case 401:
          throw new Error('Unauthorized: Please check your credentials.');
        case 404:
          throw new Error('Not Found: The requested resource was not found.');
        case 500:
          throw new Error('Server Error: Try again later.');
        default:
          throw new Error(`Unexpected status code: ${response.status}`);
}}}).then(data=>{
  console.log("Data fetched :",data)
}).catch(error=> 
  console.error("Error fetching data : ",error.message)
)
 return(
  <div>
    <h1>My App</h1>
  </div>
 )
}
*/
async function fetchData(){
  const r = await fetch('http://localhost:5000/data/',{
    headers:{"Accept":"application/json",
      "Content-Type":"application/json"
    },
    body:'{"title":"my_app"}'
  }
  )
  if (r.ok === true){
    const data = await r.json();
    return data
  }
  throw new Error("Can't reach server ...")
}



function InputText(){
  const [text,setText] = useState("");
  const handleInputChange = (e) => {
    setText(e.target.value)
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Text Input Example</h1>
      <input
        type="text"
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Type something here..."
        value={text}
        onChange={handleInputChange}
      />
      <div className="border rounded-lg p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Text Window:</h2>
        <p>{text || "Your typed text will appear here."}</p>
      </div>
    </div>
  );
}

function History(){
  const [prompts,setPrompt] = useState([])
  const [answers,setAnswers] = useState([])

  function handleNewEntry(p,a){
    const newPrompts = [prompts,p];
    const newAnswers = [answers,a];
    setPrompt = newPrompts;
    setAnswers = newAnswers;
  }
  return (
    <div>
      <p>prompts : {prompts}</p>
      <p>answers: {answers}</p>
    </div>
  )
} 

function prompt({p}){
  return (
    <div>
      <p></p>
    </div>
  )
}

function P_A({p,a}){
  return(
    <div>
      <p>prompt:{p}</p>
      <p>answer:{a}</p>
    </div>
  )
}

function App(){
  let data;
  //data = fetchData().then(data=>console.log(data));
  fetch('http://localhost:5000/data/');
  //console.log(data.text())
  return(
  <div>
    <h1>My App</h1>
    <div><TextInputWithButton /></div>
  </div>
 )
}

async function getAnswer(value){
  const answer = await fetch("http://localhost:5000/prompt/"+value).then(res=>res.json())
  
  console.log(answer.answer)
  return answer.answer
} 

const TextInputWithButton = () => {
  const [inputValue, setInputValue] = useState(""); // State for the input field
  const [displayText, setDisplayText] = useState(""); // State for the displayed text
  const [displayAnswer,setDisplayAnswer] = useState("");
  const [prompts,setPrompts] = useState([]);
  const [answers,setAnswers] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnswer = (e) => {
    setDisplayAnswer(e)
  }
  // Handle button click
  const handleButtonClick = async () => {
    //History.handleNewEntry(displayText,displayAnswer)
    setPrompts([prompts,displayText])
    setAnswers([answers,displayAnswer])
    setDisplayAnswer("")
    //let res;
    
    setDisplayText("vous : " + inputValue); // Update the displayed text
    //fetch("http://localhost:5000/prompt/"+inputValue)
    
    const res = await getAnswer(inputValue)
    setDisplayAnswer("model : " + res||"model : waiting for answer");
    setInputValue("");

  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Input with Button Example</h1>
      <input
        type="text"
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Type something here..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        Update Text
      </button>
      <div className="border rounded-lg p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Text Window:</h2>
        <p>{displayText || "Your updated text will appear here."}</p>
        <p>{displayAnswer || "Awaiting for answer ..."}</p>
      </div>
      <div>
        <p>prompt :{prompts}</p>
        <p>answers : {answers}</p>
      </div>
      <P_A p="my prompt" a="my answer" />
    </div>
  );
};


export default App;