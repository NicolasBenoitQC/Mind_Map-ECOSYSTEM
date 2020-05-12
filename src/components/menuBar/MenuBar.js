import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStylesBar = makeStyles((theme) => ({
    rootBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRigth: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const MenuBar = props => {
    
    const classesBar = useStylesBar();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    /*const handleChange = (event) => {
        setAuth(event.target.checked);
    };*/

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classesBar.rootBar}>
            <AppBar position="static" color='inherit'>
            <Toolbar>
                <IconButton edge="start" className={classesBar.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classesBar.title}>
                Mind Map ECOSYSTEM
                </Typography>
                {auth && (
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>
            </AppBar>
        </div>
    );
}

export default MenuBar;

