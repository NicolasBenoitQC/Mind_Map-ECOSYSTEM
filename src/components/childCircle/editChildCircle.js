import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, TextField, Button, Container, Box
         } from '@material-ui/core';


const useStyles = makeStyles(() => ({
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
    },
}));

const EditChildCircle = props => {

    const [circleID] = useState(props.location.aboutProps.id);

    const [circle, setCircle] = useState([{
        title: '',
        description: '',
        id: '',
    }])

    useEffect(() => {getCircle()},[]);
    useEffect(() => {}, [circle]);


    const mainPath = 'http://localhost:5000/';

    const getCircle = () => {
        axios.get(mainPath + 'childs/' + circleID)
            .then(response => {
                setCircle(response.data)
            })
            .catch(error => console.log('This is the error to the methode get : ' + error))
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

        axios.post(mainPath + 'childs/update/' + circleID, updateCircle)
            .then(res => console.log(res.data))
            .catch((error) => {console.log('Message error from action update: ' + error)})

        setTimeout(function(){ window.location = '/'}, 500)
    }

    const classes = useStyles();

    return (
        <div>
            <Container maxWidth='sm' >    
                <form >
                    <TextField 
                        id='filled-basic' 
                        label='Title' 
                        value={circle.title}
                        onChange={handleChangeTitle} 
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <br/>
                    <TextField
                        id="filled-basic"
                        label="Description"
                        value={circle.description}
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