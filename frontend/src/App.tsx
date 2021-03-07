import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom" 

import Button from './components/headerbutton'
import Home from './screens/home'
import Child from './screens/child'
import Parent from './screens/parent'


import './App.css';

function App() {
  return (
    <div className="App">
      
        <Router>
          <header>
            <Button to="/" text="Home"/>
            <Button to="/child" text="Child"/>
            <Button to="/parent" text="Parent"/>
          </header>
          <div id="mainContainer"> 
            <Route path="/" exact component={Home}/>
            <Route path="/child" component={Child}/>
            <Route path="/parent" component={Parent}/>
          </div>
        </Router>

      
    </div>
  );
}

export default App;
