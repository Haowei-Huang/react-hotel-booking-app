import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, Menu, MenuItem } from '@mui/material';
import LoginAndRegisterForm from '../LoginAndRegister/LoginRegisterForm';
import { useState } from 'react';
import { userLogout } from '../../helpers/users';


function MainHeader() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(logout());
        await userLogout();
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ width: '100%' }} >
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link}
                        to="/"
                        variant="h4"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1, textDecoration: 'none', width: '10%', margin: 'auto', fontWeight: 'bold' }}>
                        Booking
                    </Typography>

                    {!isAuthenticated && <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={handleDialogOpen}>Register</Button>}
                    {!isAuthenticated && <Button color="inherit" variant="outlined" sx={{ mr: 2, }} onClick={handleDialogOpen}>Login</Button>}
                    {isAuthenticated && role === 'admin' && <Button color="inherit" component={Link} to="/Dashboard" variant="outlined" sx={{ mr: 2, }}>Dashboard</Button>}
                    {isAuthenticated && <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={handleLogout}>Logout</Button>}
                    {isAuthenticated && role === 'user' && <div>
                        <IconButton id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} color="inherit"><AccountCircleIcon /></IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem component={Link} to="/UserProfile">Profile</MenuItem>
                            <MenuItem component={Link} to="/Bookings">My bookings</MenuItem>
                            {/* <MenuItem component={Link} to="/UserProfile">Logout</MenuItem> */}
                        </Menu>
                    </div>}
                </Toolbar>
            </AppBar >
            <LoginAndRegisterForm open={openDialog} onClose={handleDialogClose} />
        </Box>);
}

export default MainHeader;