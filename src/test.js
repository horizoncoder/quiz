import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
function App(props) {

  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [image, setImage] = useState([]);
  const [cQuestion, setCQuestion]=useState(0)
  const[score,setScore]=useState(0)
  const [result ,setResult]=useState(false)
  
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoders/quizjson2/titles')
      .then(function(response) {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoders/quizjson2/answers')
      .then(function(response) {
        setAnswer(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoders/quizjson2/images')
      .then(function(response) {
        setImage(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  const listItems = data.map((item) =>
  <span>{ item.title }</span>
);
const listImage = image.map((item) =>
<img width="90px"src={ item.url }></img>
);
const listanswer = answer.map((item) =>
<span>{item.answer}</span>
);

const click = () => {
console.log(score)
setScore(1)
setScore(1)
console.log(score)
};
  return (
    <div className="App">
      <div className="quizz">
      <div className="question_section">
        <div className="question_count">
          <span>Question 1:{
              listItems[0+score]
            }</span>  1/ 5
        </div>
       {listImage[0]}

        <br></br>
        <div className="question_text">
          {listImage[1+score]}
        </div>
        </div>
        <div className="answer_buttons">
          <button onClick={click}>{listanswer[0+score]}</button>
          <button>{listanswer[1+score]}</button>
          <button>{listanswer[2+score]}</button>
          <button>{listanswer[3+score]}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
