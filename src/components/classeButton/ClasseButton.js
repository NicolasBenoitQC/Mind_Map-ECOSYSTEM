import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStylesButton = makeStyles((theme) => ({
    rootButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const ClasseButton = props => {

    const classeButton = useStylesButton();

    return(

    );
};

export default ClasseBut