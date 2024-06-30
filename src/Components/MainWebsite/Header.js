import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../authSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, Menu, MenuItem } from '@mui/material';
import LoginAndRegisterForm from '../LoginAndRegister/LoginRegisterForm';
import { useState } from 'react';


function MainHeader() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Box sx={{ width: '120px', margin: 'auto' }}>
                            <Typography component={Link}
                                to="/"
                                variant="h4"
                                color="inherit"
                                align="center"
                                noWrap
                                sx={{ flex: 1, textDecoration: 'none', width: '100px', margin: 'auto', fontWeight: 'bold' }}>
                                Booking
                            </Typography>
                        </Box>
                    </Box>

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