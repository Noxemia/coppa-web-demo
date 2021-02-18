
import Certificate from './ppclib/types/certificate'
import React from 'react';
import react,  {useState, useEffect} from 'react'
import './App.css';
import Policy from './ppclib/types/atomics/policy'
import keys from './ppclib/ppc_config';
import {p_policy,m_consent} from './ppclib/oparent';
import pi_policy from './ppclib/iparent';
import Consent from './ppclib/types/atomics/consent';

const axios = require('axios').default;



function acceptConsentImpl(headingUpdater: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, policy: string) {

  // rn we save policy as a string, I dont really feel like refactoring this rn to also save the state of the policy
  let parsed_policy = new Policy(policy)

  let pp = p_policy(parsed_policy)

  let consent = new Consent("Me as a parent gives the big consent")
  let cc = m_consent(consent, pp)

  axios.post('http://localhost:4000/iwebsite/acceptConsent', {
    cc: cc
  })
  .then(() => {
    headingUpdater('request accepted')
  })

}


function App() {
  let [policy, updatePolicy] = useState('No Consent Requests Available')
  useEffect(() => {
    axios.get('http://localhost:4000/owebsite/availableRequest')
    .then((response: any) => {
      /// I called my var data, the body thing is called data by default and my return field is called data, deal with it :sunglasses:
      console.log(response.data.cp)
      // Parse json recived into Certificate of Policy
      let parsed_policy = new Policy(response.data.cp.policy)
      let cert = new Certificate(response.data.cp.sign, parsed_policy)

      let policy = pi_policy(cert)
      updatePolicy(policy.content)
    })
    .catch((err: any) => {
      console.log(err + "lmao xdd")
    })

  },[policy])

  function acceptConsent(){
    acceptConsentImpl(updatePolicy, policy)
  }

  return (
    <div className="App">
      {policy}
      <br></br>
      {policy != 'No Consent Requests Available' ? <button onClick={acceptConsent}>Accept</button> : null}
    </div>
  );
}

export default App;
