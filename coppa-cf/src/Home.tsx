import './App.css';
import React, { useState, useEffect } from 'react';
import Info from './ppclib/types/atomics/info';
import m_info from './ppclib/ochild';
import Certificate from './ppclib/types/certificate';
import keys from './ppclib/ppc_config'
import Proof from './ppclib/types/proof';
import Consent from './ppclib/types/atomics/consent';

const axios = require('axios').default;

function requestFunctionImpl(setFuction: { (value: React.SetStateAction<string>): void; (arg0: string): void; }){
  setFuction('Request Sent')

  axios.post('http://localhost:4000/iwebsite/requestConsent', {
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
    axios.get('http://localhost:4000/owebsite/getConsent')
    .then((response: any) => {
      console.log(response.data.pc)

      if(response.data.pc.sign != "website") throw new Error ("Sign does not match from website")

      setAC(response.data.pc.content)
    })
  }, [])

  function sendInfo(){
    let info = new Info("This is some big info, probably in json format")

    // get this certificate from server instead
    let cert = new Certificate(keys.website_key, new Consent("lmao"))
    let pc = new Proof(keys.website_key, cert)
    let ci = m_info(info, pc)


    axios.post('http://localhost:4000/iwebsite/sendInfo', {
      ci
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
