import Home from './Home.js'
import react, {useState, useEffect} from 'react'
const axios = require('axios').default;



const App = () => {
    const [info, setInfo] = useState("Loading, backend probably off")
    useEffect(() => {
        axios.get('http://localhost:4000')
        .then(data => {  
            setInfo(data.data)  
      })
      .catch(err => console.log("error caught " + err))
    }, [])
    
    return (
         <Home heading={info}/>
    )
 

} 

export default App