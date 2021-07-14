import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState,ReactElement } from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function App(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    setScore(0)
    setBtn1(0)
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [image, setImage] = useState([]);
  const [point ,setPoint]=useState(0)
  const[score,setScore]=useState(0)
  const[end,setEnd]=useState(0)
  const[btn1,setBtn1]=useState(0)
  const [results ,setResults]=useState([])
  
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoder/quizjson/titles')
      .then(function(response) {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoder/quizjson/answers')
      .then(function(response) {
        setAnswer(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoder/quizjson/images')
      .then(function(response) {
        setImage(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/horizoncoder/quizjson/results')
      .then(function(response) {
        setResults(response.data)
        console.log(response.data)
      })
      .catch(error => console.log(error));
    
  }, []);
    
  const listIresults = results.map((item) =>
  <span>{ item.result }</span>
);
  const listItems = data.map((item) =>
  <span>{ item.title }</span>
);
const listImage = image.map((item) =>
<img width="200px"src={ item.url }></img>
);
const listanswer = answer.map((item) =>
<span>{item.answer}</span>
);

const click = (points) => {
console.log(point)
console.log(score)
console.log(btn1)
setScore(1)
setBtn1(4)
setPoint(points+1)
setScore(score+1)
setBtn1(btn1+4)
if(point===22){
setEnd(0)
}else if(point===21){
  setEnd(1)
}
else if(point===19){
  setEnd(3)
}
else if(point===17){
  setEnd(2)
}
if(score===4){
  openModal()
}
};
  return (
    
    <div className="App">
       <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{listIresults[end]}</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
      <div className="quizz">
      <div className="question_section">
        <div className="question_count">
          
          <span>Question :{
              listItems[0+score]
            }</span>  {score+1}/ 5
        </div>
        <br></br>
        <div className="question_text">
          {listImage[0+score]}
        </div>
        </div>
        
        <div className="answer_buttons">
          <button onClick={()=>click(2+btn1)}>{listanswer[0+btn1]}</button>
          <button onClick={()=>click(btn1)}>{listanswer[1+btn1]}</button>
          <button onClick={()=>click(4+btn1)}>{listanswer[2+ btn1]}</button>
          <button onClick={()=>click(5+btn1)}>{listanswer[3+btn1]}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
