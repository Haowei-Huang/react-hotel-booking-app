import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { AppBar, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import PaymentIcon from '@mui/icons-material/Payment';
import KeyIcon from '@mui/icons-material/Key';
import { Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authSlice';
import ChangePassword from './ChangePassword';
import ManagerUsers from './ManageUsers/ManageUsers';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import ManageHotels from './ManageHotels/ManageHotels';
import AdminViewBookings from './AdminViewBookings/AdminViewBookings';
import Stats from './DashboardStats/Stats';
import { StatsContextProvider } from './DashboardStats/StatsContext';

export const Dashboard = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    const drawerWidth = "12%";

    return (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth})`, ml: `${drawerWidth}` }}>
            <Toolbar >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>
                {isAuthenticated && <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={handleLogout}>Logout</Button>}
            </Toolbar>
        </AppBar >
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Navigation
                </ListSubheader>
            }>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home Page" />
                </ListItemButton>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Data
                </ListSubheader>
            }>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard/ManageUsers">
                        <ListItemIcon>
                            <SupervisedUserCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Users" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard/ManageHotels">
                        <ListItemIcon>
                            <HotelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Hotels" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard/ViewBookings">
                        <ListItemIcon>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Bookings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard">
                        <ListItemIcon>
                            <ShowChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Status" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    User
                </ListSubheader>
            }>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/Dashboard/ChangePassword">
                        <ListItemIcon>
                            <KeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        <Box component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            <Routes>
                <Route index element={<StatsContextProvider><Stats /></StatsContextProvider>} />
                <Route path="ManageUsers" element={<ManagerUsers />} />
                <Route path="ManageHotels/*" element={<ManageHotels />} />
                <Route path="ViewBookings/*" element={<AdminViewBookings />} />
                <Route path="ChangePassword" element={<ChangePassword />} />
            </Routes>
        </Box>
    </Box>);
};

