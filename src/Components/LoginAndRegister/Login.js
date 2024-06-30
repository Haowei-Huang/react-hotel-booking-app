import { Container, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import LoginAndRegisterFormContext from "./LoginAndRegisterFormContext";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../authSlice';

function Login({ handleNavigate }) {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    const dispatch = useDispatch();

    const { registrationData, setRegistrationData, errors, setErrors } = useContext(LoginAndRegisterFormContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        // find the user and compare password, have to use findAll as we can't directly find user by email
        try {
            const response = await fetch(DB_URL + '/document/findAll/users', requestOptions);
            const data = await response.json();
            const user = data.data.find(u => u.email.toLowerCase() === registrationData.email.toLowerCase() && u.password === registrationData.password);

            // if password matched, log in
            if (user) {
                setErrors({});
                console.log(user);
                dispatch(login({ username: user.email, sessionKey: user._id, role: user.role }));
                handleNavigate("LoginSuccess");
            } else {
                setErrors({ PasswordIncorrect: "The password you entered is incorrect, please try again" });
                return;
            }
        } catch (error) {
            console.error('Error during fetching all users:', error);
            setErrors({ ...errors, errorDuringRegister: 'An error occurred during login' });
            return;
        }

        setErrors({});
        setRegistrationData({
            email: '',
            role: 'user',
            password: '',
            confirmPassword: ''
        });
    };

    const handleChange = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    };

    return (<React.Fragment>
        <Typography component="h1" variant="h5" gutterBottom sx={{ mt: 1 }}>
            Enter password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                type="password"
                value={registrationData.password}
                onChange={handleChange}
            />
            <Button type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} disabled={!registrationData.password.trim()}>Login</Button>
            {<Alert severity="error" sx={{ visibility: Object.keys(errors).length > 0 ? 'visible' : 'hidden' }}>{Object.keys(errors).map((key) => (
                <label key={key}>
                    {errors[key]}
                </label>
            ))}</Alert>}
        </Box>
    </React.Fragment>);
}

export default Login;