import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, makeStyles} from '@material-ui/core'
import axios from 'axios'
import './SvgContainer.css';
import ParentCircle from '../parentCircle/ParentCircle';
import ChildCircle from '../childCircle/ChildCircle';

const useStylesButton = makeStyles(() => ({
  rootButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const  SvgContainer = props => {
  const [array, setArray] = useState([])
  
  useEffect (() => {getAll()},[]);
  useEffect (() => {},[array]);

  const mainPath = 'http://localhost:5000/';

  const getAll = () => {
    axios.get(mainPath + 'childs/')
      .then(response => {
        setArray(response.data)
      })  
      .catch(error => console.log('this is the error to the methode getAll' + error))
  }

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

  }

  const deleteCircle = () => {
    if(array.length > 0) {
      const number = array.length-1;
      const lastCircleId = array[number]._id

      axios.delete(mainPath + 'childs/'+ lastCircleId)
        .then(response => {setArray(array.filter(el => el._id !== lastCircleId));
        })
        .catch(error => console.log(`message error from action delete : ${error}`))
    }
  }

  const listChild = () => {
    return array.map((currentChildCircle) => {
      return <ChildCircle 
                key={currentChildCircle.id} 
                circle={currentChildCircle} 
                number={array.length} 
              />
    })
  }

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
  }  

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