import { Paper, Stack, Typography, Box, Container } from "@mui/material"
import SearchBar from "../SearchHotelContext/SearchBar";
import React from "react";

export const WelcomePage = () => {
    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url("https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/313564245.jpeg?k=c677d4c63f8a8218d275614559b8ccd5dc5f169b44667c3ff46328091c225b13&o=")`,
                    height: "40%"
                }}>
                <Stack spacing={3} sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 }
                }}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        A dream stay
                        for a bucket list trip
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        Make it a trip to remember in a holiday home
                    </Typography>
                    <Box>
                        <SearchBar />
                    </Box>
                </Stack>
            </Box>
            <Paper maxWidth="md" sx={{ my: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Admin Dashboard Login
                </Typography>
                <Typography variant="body2" >
                    To view the admin dashboard, please create your admin account first in the database following this format:
                </Typography>
                <Box sx={{
                    backgroundColor: 'grey.900',
                    color: 'white'
                }}>
                    {JSON.stringify({
                        email: "[adminEmail]",
                        role: "admin",
                        password: "[adminPassword]"
                    }, null, 2)}
                </Box>
            </Paper>
        </React.Fragment>);
};