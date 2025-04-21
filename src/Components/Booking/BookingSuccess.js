import { Button, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookingSuccess() {
    const role = useSelector(state => state.auth.role);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Paper elevation={3} sx={{ margin: "auto", p: 10 }}>
            <Stack spacing={2}>
                <Typography variant="h4">Booked Successfully!</Typography>
                <Typography variant="h4">We have sent a confirmation to your email.</Typography>
                {isAuthenticated && role === 'user' && <Button component={Link} variant="contained" size="large" to="/Bookings">View my bookings</Button>}
                <Button component={Link} size="large" variant="contained" to="/">Go to Home Page</Button>
            </Stack>
        </Paper>
    );
}

export default BookingSuccess;