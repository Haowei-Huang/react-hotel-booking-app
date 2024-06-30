import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChangePassword() {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,20}$');
    const sessionKey = useSelector(state => state.auth.sessionKey);

    const [userData, setUserData] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setNewPassword({ ...newPassword, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        setErrors({});
        event.preventDefault();

        //verify old password is correct
        try {
            const requestOptions = {
                method: "GET",
                headers: new Headers({
                    // "Authorization": jwtToken,
                    "Content-Type": "application/json"
                })
            };
            const response = await fetch(DB_URL + `/document/findOne/users/${sessionKey}`, requestOptions);
            const data = await response.json();
            const user = data.data;
            console.log(user);

            //set error message if password is wrong
            if (user.password !== newPassword.oldPassword) {
                setErrors({ ...errors, PasswordIncorrect: "The old password you entered is incorrect, please try again" });
                return;
            } else {
                setUserData(user);
            }
        } catch (error) {
            console.error('Error during changing password:', error);
            setErrors({ ...errors, errorDuringRegister: 'An error occurred during changing password' });
            return;
        }

        // update new password
        try {
            const updateRequestOptions = {
                method: "PUT",
                headers: new Headers({
                    // "Authorization": jwtToken,
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    ...userData,
                    isActive: true,
                    password: newPassword.password
                }),
            };

            const response = await fetch(DB_URL + `/document/updateOne/users/${sessionKey}`, updateRequestOptions)
            if (response.ok) {
                setPasswordChanged(true);
                setErrors({});
                setNewPassword({
                    oldPassword: '',
                    password: '',
                    confirmPassword: ''
                });
                setUserData({});
            } else {
                console.error('Error during changing password:', response.statusText);
                setErrors({ ...errors, errorDuringUpdate: 'An error occurred during updating password' });
            }
        } catch (error) {
            console.error('Error during changing password:', error);
            setErrors({ ...errors, errorDuringUpdate: 'An error occurred during updating password' });
        }

    };

    useEffect(() => {
        const errorsObject = {};
        const { password, confirmPassword } = newPassword;

        if (password.trim() && confirmPassword.trim()) {
            //new pasword format wrong
            if (!passwordRegex.test(password)) {
                errorsObject.passwordFormat = "password format is wrong, please use a minimum of 3 characters, including uppercase letters, lowercase letters and numbers.";
            } else if (password.trim() !== confirmPassword.trim()) { //passwords not matching
                errorsObject.passwordNotMatch = "Passwords are not matching";
            }
        }
        setErrors(errorsObject);
    }, [newPassword.password, newPassword.confirmPassword]);

    // when password changed, set the alert to disappear 5 seconds later
    // notice that only when the passwordChanged is set to true, the alert would show
    useEffect(() => {
        const timer = setTimeout(() => {
            setPasswordChanged(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [passwordChanged]);


    return (<Container maxWidth="sm">
        <Typography component="h1" variant="h5" gutterBottom sx={{ mt: 1 }}>
            Change password
        </Typography>
        <Typography variant="body" gutterBottom>
            Use a minimum of 3 characters, including uppercase letters, lowercase letters and numbers.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="Please enter your old password"
                name="oldPassword"
                autoComplete="oldPassword"
                type="password"
                value={newPassword.oldPassword}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                type="password"
                value={newPassword.password}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Re-enter your new password"
                name="confirmPassword"
                autoComplete="confirmPassword"
                type="password"
                value={newPassword.confirmPassword}
                onChange={handleChange}
            />
            <Button type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }} disabled={Object.values(newPassword).some(value => !value.trim()) || Object.keys(errors).includes('passwordNotMatch') || Object.keys(errors).includes('passwordFormat')}
            >Change Password</Button>
            {Object.keys(errors).length > 0 && <Alert severity="error">
                {Object.keys(errors).map((key) => (
                    <label key={key}>
                        {errors[key]}
                    </label>
                ))}
            </Alert>}
            {passwordChanged && <Alert severity="success">New password saved!</Alert>}
        </Box>
    </Container>);
}

export default ChangePassword;