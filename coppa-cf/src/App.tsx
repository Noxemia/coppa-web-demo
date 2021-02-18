import Home from './Home'
import react, {useState, useEffect} from 'react'
import React from 'react';
const axios = require('axios').default;



const App = () => {
    const [info, setInfo] = useState("Loading, backend probably off")
    useEffect(() => {
        axios.get('http://localhost:4000')
        .then((data: { data: react.SetStateAction<string>; }) => {  
            setInfo(data.data)  
      })
      .catch((err: string) => console.log("error caught " + err))
    }, [])
    
    return (
         <Home heading={info}/>
    )
 

} 

export default App