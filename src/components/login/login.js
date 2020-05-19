import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Container, TextField, FormControl, 
    InputLabel, Select, Box, Button,  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    rootLink: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 1,
        padding: 1,
        color: 'none',
    },
    rootButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 1,
        padding: 1,
        color: 'none',
    },
    }));

const Login = () => {
    const [name, setName] = useState('');
    const [mindmap, setMindmap] = useState('');

    const classes = useStyles();
    return (
        <Container maxWidth='sm' >
            <header className="join-header">
			    <h1><i className="fas fa-smile"></i>MindMap ECOSYSTEM</h1>
			</header>
            <main className="join-main">
				<form >
                    <TextField className={classes.formControl}
                        required
                        value={name}
                        id="username"
                        label="User Name"
                        placeholder="Enter username"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <br />
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="select-Mindmap-native-required">Select MindMap</InputLabel>
                        <Select
                        native
                        value={mindmap}
                        name="mindmap"
                        onChange={(event) => setMindmap(event.target.value)}
                        >
                        <option aria-label="None" value="" />
                        <option value={10}>MindMap 1</option>
                        <option value={20}>MindMap 2</option>
                        <option value={30}>MindMap 3</option>
                        </Select>
                    </FormControl>
                    <br />
                    <Link 
                    onClick={event => (!name || !mindmap) ? event.preventDefault() : null}
                    to={`/?username=${name}&mindmapCard=${mindmap}`}
                    className={classes.rootLink}
                    type='submit'
                    >
                        <Box className={classes.rootButton}>
                            <Button 
                            variant="outlined" 
                            aria-label="outlined primary button group"
                            type="submit"
                            >
                                Join the mindmap card
                            </Button>
                        </Box>
                    </Link>
				</form>
			</main>
        </Container>
    )
};

export default Login;