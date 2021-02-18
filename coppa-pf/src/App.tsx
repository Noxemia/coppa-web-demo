
import React from 'react';
import react,  {useState, useEffect} from 'react'
import './App.css';

const axios = require('axios').default;



function acceptConsentImpl(headingUpdater: { (value: React.SetStateAction<string>): void; (arg0: string): void; }) {
  axios.post('http://localhost:4000/acceptConsent', {
    proof: 'Ah yes this is proof'
  })
  .then(() => {
    headingUpdater('request accepted')
  })

}


function App() {
  let [consent, updateConsent] = useState('No Consent Requests Available')

  useEffect(() => {
    axios.get('http://localhost:4000/availableRequest')
    .then((data: { data: { data: react.SetStateAction<string>; }; }) => {
      /// I called my var data, the body thing is called data by default and my return field is called data, deal with it :sunglasses:
      updateConsent(data.data.data)
    })
    .catch((err: any) => {
      
    })

  },[])

  function acceptConsent(){
    acceptConsentImpl(updateConsent)
  }

  return (
    <div className="App">
      {consent}
      <br></br>
      {consent != 'No Consent Requests Available' ? <button onClick={acceptConsent}>Accept</button> : null}
    </div>
  );
}

export default App;
