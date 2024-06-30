import { Container, Paper, Box, Stack, Typography, SliderMark } from "@mui/material"
import SearchBar from "../SearchHotelContext/SearchBar";

export const WelcomePage = () => {
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url("https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/313564245.jpeg?k=c677d4c63f8a8218d275614559b8ccd5dc5f169b44667c3ff46328091c225b13&o=")`,
            }}>
            <Stack spacing={2} sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
            }}>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    A dream stay
                    for a bucket list trip
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                    Make it a trip to remember in a holiday home
                </Typography>
                <Paper elevation={3} sx={{ width: '40%', p: 2, backgroundColor: "white" }}>
                    <SearchBar sx={{ mt: 10 }} />
                </Paper>
            </Stack>
            <Typography>
                <br />
                To view the admin dashboard, please create your admin account first in the database following this format:<br />
                {JSON.stringify({
                    email: "[adminEmail]",
                    role: "admin",
                    password: "[adminPassword]"
                }).replace(/\"/g, "")}
            </Typography>
        </Paper>)
};