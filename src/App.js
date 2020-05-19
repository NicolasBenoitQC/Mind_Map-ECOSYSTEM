import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/login/login';
import Navbar from './components/menuBar/MenuBar';
import SvgContainer from './components/svgContainer/SvgContainer';
import EditChildCircle from './components/childCircle/editChildCircle';


const  App = props => {
  
  return (
    <Router>
      <div classename='container'>
        <Navbar/>
        <br/>
        <Route path='/login' component={Login} />
        <Route path='/' exact component={SvgContainer} />
        <Route path='/edit' component={EditChildCircle} />
      </div>
    </Router>
  );
}

export default App;