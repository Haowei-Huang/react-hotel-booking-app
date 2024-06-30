import { useContext } from "react";
import UserProfileContext from "./UserProfileContext";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

function UserProfileDetails() {
    const { userProfile } = useContext(UserProfileContext);

    if (!userProfile) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    } else {
        return (<Grid container spacing={2}>
            <Grid item xs={12}><Typography component="h1" variant="h5" gutterBottom sx={{ mt: 1 }}>
                Account Details
            </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    User ID
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {userProfile._id}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    Email
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {userProfile.email}
                </Typography>
            </Grid>
        </Grid>);
    }
}

export default UserProfileDetails;