import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { selectedCircle } from '../../actions';
import { makeStyles, TextField, Button, Container, Box
         } from '@material-ui/core';


// set style compenent of material UI
const useStyles = makeStyles((theme) => ({
    rootTitle: {   
    },
    rootDescription: {
    },
    rootButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 1,
        padding: 1,
        backgroundColor: 'none',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const EditChildCircle = props => {
    const [circleID] = useState(props.location.aboutProps.id);
    const [circle, setCircle] = useState({})
    const ENDPOINT = 'localhost:5000/';
    
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        getCircle();
        
    },[]);
     
    
    const getCircle = () => {
        const socket = io.connect(ENDPOINT);
        
        socket.emit('get child circle by ID', circleID, (data) => {
            console.log(data)
            setCircle(data);
            dispatch(selectedCircle(data));
        });
    }
    
    const handleChangeTitle = (event) => {
        const updateCircle = {
            title: event.target.value,
            description: circle.description,
            id: circle.id,
        } 
        setCircle(updateCircle);
    };

    const handleChangeDescription = (event) => {
        const updateCircle = {
            title: circle.title,
            description: event.target.value,
            id: circle.id,
        }
        setCircle(updateCircle);
    };

    const editingFinished = (e) => {
        e.preventDefault()

        const updateCircle = {
            title: circle.title,
            description: circle.description,
            id: circle.id,
        }

        const socket = io.connect(ENDPOINT);

        socket.emit('update props circle', circleID, updateCircle,'update', (data) => {
            console.log(data);
        });

        setTimeout(function(){ window.location = '/'}, 500) // JMA why i need timer
    }

    const deleteChildCircle = (e) => {
        e.preventDefault();
        const title = circle.title;
        console.log(title);
        const socket = io.connect(ENDPOINT);

        socket.emit('delete circle', title, (data) => {
            console.log(data);
            console.log('circle deleted');
        })

        setTimeout(function(){ window.location = '/'}, 500);
    }


    const classes = useStyles();

    return (
        <div>
            <Container maxWidth='sm' >    
                <form >
                    <TextField 
                        id='filled-basic' 
                        label='Title' 
                        value={circle.title || ''}
                        onChange={handleChangeTitle}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <br/>
                    <TextField
                        id="filled-basic"
                        label="Description"
                        value={circle.description || ''}
                        onChange={handleChangeDescription}
                        fullWidth
                        multiline
                        margin="normal"
                        rowsMax='23'
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <br/>
                    <Box className={classes.rootButton}>
                        <Button 
                            onClick={deleteChildCircle}
                            variant="contained" 
                            color="inherit" 
                            aria-label="outlined primary button group"
                            disableElevation 
                            >
                            delete the circle
                        </Button>
                        
                        <Button 
                            onClick={editingFinished}
                            variant="contained" 
                            color="inherit" 
                            aria-label="outlined primary button group"
                            disableElevation 
                            >
                            Editing finished
                        </Button>
                    </Box>
                </form>
            </Container>
        </div>
        
    )
};

export default EditChildCircle;