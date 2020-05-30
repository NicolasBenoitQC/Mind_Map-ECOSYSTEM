import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Button, ButtonGroup, makeStyles} from '@material-ui/core';
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
  const ENDPOINT = 'localhost:5000/';
// --------------------------------------------------

// ............... catch event and update .......................

  // get the USERNAME connect.
  useEffect(() => {
  // get the information from the search bar emit by the login page;
    const { username } = queryString.parse(location.search);
    const mindmapCard = 'MindMap 1';

  // connect the client to socket.io;
    const socket = io.connect(ENDPOINT);
    socket.emit('start', username, mindmapCard, (data) => {
      console.log(data)
    });
    socket.on('join', (data) => {
      console.log(data);
    });
    getAll()
  },[ENDPOINT, location.search]); 

  // Actualise when add, delete, update child circle.
  useEffect(() => {
    const socket = io.connect(ENDPOINT);
    socket.on('getAllDelete', data => {
      console.log(data)
      getAll();
    });
    socket.on('getAllAdd', data => {
      console.log(data)
      getAll();
    });
    socket.on('update', data => {
      console.log(data);
      getAll();
    });
    socket.on('delete', data => {
      console.log(data);
      getAll();
    });
  },[]);

// ..............................................................

// __________ Request to data base MongooseDB ____________
  // get title and description of each child circle;
  const getAll = () => {
    const mindmapCard = 'MindMap 1';
    const socket = io.connect(ENDPOINT);

    socket.emit('get all childs circles', mindmapCard, (data) => {
      setArray(data);
    });    
  };

  // add new child circle with value by default;
  const add = () => {
    const title = 'New circle sio';
    const description = '';
    const id = array.length + 1;

    const socket = io.connect(ENDPOINT);
    socket.emit('add new child circle', title, description, id, (data) => {
      setArray(data);
    });
  };

  // delete the last create child circle (like -1);
  const deleteCircle = () => {
    if(array.length > 0) {
      const number = array.length-1;
      const lastCircleId = array[number]._id
      const socket = io.connect(ENDPOINT);

      socket.emit('delete the last child circle', lastCircleId, (data) => {
        setArray(data);
      });
    }
  };


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

  // react component return DOM
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