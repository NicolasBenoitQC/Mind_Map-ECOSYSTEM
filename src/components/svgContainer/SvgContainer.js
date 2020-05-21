import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Button, ButtonGroup, makeStyles} from '@material-ui/core';
import axios from 'axios';
import './SvgContainer.css';
import ParentCircle from '../parentCircle/ParentCircle';
import ChildCircle from '../childCircle/ChildCircle';

// set style element of material-ui
const useStylesButton = makeStyles(() => ({
  rootButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

// component hooks generate the mindmap with the parent circle and the child circles;
const  SvgContainer = ({ location }) => {
// ---------------- initialize variable -------------
  const [array, setArray] = useState([]);
  const [name, setName] = useState('');
  const [mindmap, setMindmap] =useState('');

  const mainPath = 'http://localhost:5000/';
  const ENDPOINT = 'localhost:5000/';
// --------------------------------------------------

// ............... catch event and update .......................
  // actualise when load page;
  useEffect(() => {getAll()},[]);
  // actialise when array is updated (setArray);
  useEffect(() => {},[array]);
  // for the moment is the proto for use socket.io
  useEffect(() => {
  // get the information from the search bar emit by the login page;
    const { username } = queryString.parse(location.search);
    setName(username);
    const mindmapCard = 'MindMap 1';
    setMindmap(mindmapCard);

  // connect the client to socket.io;
    // this is the proto from the documentation socket.io;
    const socket = io.connect(ENDPOINT);

    socket.emit('ferret', username, mindmapCard, (data) => {
      console.log(data)
    });

    socket.on('join', (data) => {
      console.log(data);
    });

  },[ENDPOINT, location.search]);
// .................................................

// __________ Request to data base MongooseDB ____________
  // get title and description of each child circle;
  const getAll = () => {
    axios.get(mainPath + 'childs/')
      .then(response => {
        setArray(response.data)
      })  
      .catch(error => console.log('this is the error to the methode getAll' + error))
  };

  // add new child circle with value by default;
  const add = () => {
    const newCircle = {
      title: 'New circle ',
      description: '',
      id: array.length + 1
    }

    axios.post(mainPath + 'childs/add', newCircle)
      .then(response => { console.log(response.data); 
       getAll(); 
      })
      .catch((error) => { console.log(`message error from post add : ${error}`)}
      )

  };

  // delete the last create child circle (like -1);
  const deleteCircle = () => {
    if(array.length > 0) {
      const number = array.length-1;
      const lastCircleId = array[number]._id

      axios.delete(mainPath + 'childs/'+ lastCircleId)
        .then(response => {setArray(array.filter(el => el._id !== lastCircleId));
        })
        .catch(error => console.log(`message error from action delete : ${error}`))
    }
  };
// _________________________________________________________

// -------------- element for the DOM ----------------------
  // generate all child circle element;
  const listChild = () => {
    return array.map((currentChildCircle) => {
      return <ChildCircle 
                key={currentChildCircle.id} 
                circle={currentChildCircle} 
                number={array.length} 
              />
    })
  };

  // generate the button add and delete at the top the mindmap;
  const Buttons = () => {
    const classes = useStylesButton();

    return  <div className={classes.rootButton}>
              <ButtonGroup
                color="inherit" 
                aria-label="outlined primary button group"
              >
                <Button onClick={add}>Add</Button>
                <Button onClick={deleteCircle}>Delete</Button>
                <Button>.....</Button>
              </ButtonGroup>
            </div>
  }; 
//----------------------------------------------------------
  // react component return
  return (
    <div>
      {Buttons()}
        <div className='svg-container'>
          <svg version="1.1" viewBox="0 0 100 65" 
                preserveAspectRatio="xMinYMin meet" className="svg-content">
            <ParentCircle />
            {listChild()}
          </svg>
        </div>
    </div>
  );
}

export default SvgContainer;