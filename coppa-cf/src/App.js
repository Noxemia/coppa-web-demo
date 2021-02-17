import './App.css';
const axios = require('axios').default;


axios.get('http://localhost:4000')
.then(data => console.log(data))
.catch(err => console.log("error caught " + err))

console.log("lmaoxd")


function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
