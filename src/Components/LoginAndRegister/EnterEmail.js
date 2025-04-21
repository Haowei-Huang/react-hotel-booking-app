import { Container, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import LoginAndRegisterFormContext from "./LoginAndRegisterFormContext";
import { useNavigate } from 'react-router-dom';
import { findUserByEmail } from "../../Helpers/users";

function EnterEmail({ handleNavigate }) {
    const { registrationData, setRegistrationData, errors, setErrors } = useContext(LoginAndRegisterFormContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // match the format
        if (!registrationData.email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setErrors({ ...errors, emailFormat: "Email format is incorrect" });
            return;
        }

        // check if the email has been registered
        try {
            const user = await findUserByEmail(registrationData.email);
            if (user) {
                handleNavigate("Login")
                //navigate('Login');
            } else {
                handleNavigate("Register")
                //navigate('Register');
            }
            setErrors({});
        } catch (error) {
            console.error('Error during fetching all users data:', error);
            setErrors({ ...errors, errorDuringRegister: 'An error occurred during findAll users' });
            return;
        }
    };

    const handleChange = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    };

    return (<React.Fragment>
        <Typography component="h1" variant="h5" gutterBottom>
            Sign in or create an account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={registrationData.email}
                onChange={handleChange}
            />
            <Button type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} disabled={!registrationData.email.trim()}>Continue with email</Button>
            {<Alert severity="error" sx={{ visibility: Object.keys(errors).length > 0 ? 'visible' : 'hidden' }}>{Object.keys(errors).map((key) => (
                <label key={key}>
                    {errors[key]}
                </label>
            ))}</Alert>}
        </Box>
    </React.Fragment>);
}

export default EnterEmail;