import './App.css';
import React, { useState, useEffect } from 'react';

const axios = require('axios').default;

function requestFunctionImpl(setFuction: { (value: React.SetStateAction<string>): void; (arg0: string): void; }){
  setFuction('Request Sent')

  axios.post('http://localhost:4000/requestConsent', {
    childId: 100
  })
  .then(() => {setFuction("Request Success")})
  .catch((err: any) => setFuction("Request Failed"))
}


interface HomeProps{
  heading: String
}

const Home:React.FC<HomeProps> = ({heading}) => {
  const [text, setText] = useState('')

  const [availableConsent, setAC] = useState('')

  function requestFunction(){
    requestFunctionImpl(setText)
  }


  useEffect(() => {
    axios.get('http://localhost:4000/getConsent')
    .then((res: { proof: React.SetStateAction<string>; }) => {
      setAC(res.proof)
    })
  }, [])

  function sendInfo(){
    axios.post('http://localhost:4000/sendInfo', {
    childName: 'Child Childsson',
    age: 45
  })
  .then(() => setAC('Info Sent'))
  .catch((err: any) => setAC('Info didn\'t Send'))
  }


  return (
    <div className="App">
       <p>{text == '' ? heading : text}</p>
       <button onClick={requestFunction}>Request Consent From me Parent</button>
       <br></br>
       {availableConsent}
       <br></br>
       {availableConsent == '' ? null : <button onClick={sendInfo}>Send Info </button> }
    </div>
  );
}

export default Home;
