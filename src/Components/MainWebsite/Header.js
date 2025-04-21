import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import { Container, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import LoginAndRegisterForm from '../LoginAndRegister/LoginRegisterForm';
import { useState } from 'react';


function MainHeader() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const location = useLocation();

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar sx={{ minHeight: '64px', display: 'flex', justifyContent: 'space-between' }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                            <HotelIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography component={Link}
                                to="/"
                                variant="h5"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    fontWeight: 'bold',
                                    letterSpacing: 1
                                }}>
                                DreamStay
                            </Typography>
                        </Box>

                        {!isAuthenticated ? (<Box>
                            <Button color="inherit" variant="outlined" sx={{ mr: 1 }} onClick={handleDialogOpen}>Login</Button>
                            <Button color="inherit" variant="outlined" sx={{ mr: 1 }} onClick={handleDialogOpen}>Register</Button>
                        </Box>) : (<Box>
                            {role === 'admin' && <Button color="inherit" component={Link} to="/Dashboard" variant="outlined" sx={{ mr: 2 }}>Dashboard</Button>}
                            {role === 'user' ? (<div>
                                <IconButton id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} color="inherit">
                                    <AccountCircleIcon />
                                </IconButton>
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
                            </div>) : <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>}
                        </Box>)
                        }
                    </Toolbar>
                </Container>
            </AppBar >
            <LoginAndRegisterForm open={openDialog} onClose={handleDialogClose} />
        </Box >);
}

export default MainHeader;