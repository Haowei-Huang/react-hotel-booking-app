import { Avatar, Box, Button, Card, CardContent, Checkbox, Chip, CircularProgress, Container, Divider, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import HotelDisplayContext from "../Hotels/HotelDisplayContext"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookingContext from "./BookingContext";
import dayjs from "dayjs";
import { Controller, set, useForm, useFormContext } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { UserInfoReuseContext } from "./BookRooms";

function ClientDetails({ nextStep }) {
    const { bookingData, dispatch } = useContext(BookingContext);
    const [useExistingInfo, setUseExistingInfo] = useState(false);
    const { userInfoReuseData } = useContext(UserInfoReuseContext);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { control, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitSuccessful, isValid }, watch, setError, clearErrors, setValue, getValues }
        = useFormContext();
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        e.preventDefault();

        if (useExistingInfo) {
            if (userInfoReuseData.clientInfo) {
                dispatch({
                    type: "setClientInfo",
                    payload: { data: userInfoReuseData.clientInfo }
                });
            } else {
                console.error("Loading existing client Info failed");
                return;
            }
        } else {
            const clientInfo = getValues("clientInfo");
            dispatch({
                type: "setClientInfo",
                payload: { data: clientInfo }
            });
        }

        nextStep();
        navigate("payment");
    }

    const handleCheck = (event) => {
        setUseExistingInfo(event.target.checked);
    }

    // check if phone number is valid
    const watchPhone = watch("clientInfo.phone");
    useEffect(() => {
        const phoneNumberRegex = new RegExp('^[0-9]{10}$');
        if (watchPhone.trim() && !phoneNumberRegex.test(watchPhone.trim())) {
            setError("clientInfo.phone", { type: "format", message: "Phone number should be 10 digits" });
        } else {
            clearErrors("clientInfo.phone");
        }
    }, [watchPhone]);

    if (!userInfoReuseData.isLoaded) {
        return (<CircularProgress />);
    } else {
        return (
            <Stack direction="column" spacing={2}>
                <Card component="form" onSubmit={handleSubmit(onSubmit)} sx={{ boxShadow: 3, p: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Personal Details
                        </Typography>
                        <Typography variant="h6">Enter your details</Typography>
                        {isAuthenticated && userInfoReuseData.hasOwnProperty("clientInfo") &&
                            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ p: 2, border: 1, my: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>
                                            First Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {userInfoReuseData.clientInfo.firstName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            Last Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {userInfoReuseData.clientInfo.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {userInfoReuseData.clientInfo.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            Phone
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {userInfoReuseData.clientInfo.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} display="flex" flexDirection="row" alignItems="center">
                                        <Typography color="primary" sx={{ mr: 2 }}>
                                            Reuse this information
                                        </Typography>
                                        <Checkbox
                                            value={useExistingInfo}
                                            onChange={handleCheck} />
                                    </Grid>
                                </Grid>
                            </Box>}
                        {!useExistingInfo && <React.Fragment>
                            <Controller
                                control={control}
                                name="clientInfo.firstName"
                                defaultValue=""
                                rules={{ required: { value: true, message: 'Invalid input' }, pattern: { value: /^[a-zA-Z ,.'-]+$/i, message: "Name format is incorrect" } }}
                                render={({ field: { name, value, onChange }, fieldState: { error }, formState }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={name}
                                        label="First Name"
                                        name={name}
                                        autoComplete="firstName"
                                        type="text"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="clientInfo.lastName"
                                defaultValue=""
                                rules={{ required: { value: true, message: 'Invalid input' }, pattern: { value: /^[a-zA-Z ,.'-]+$/i, message: "Name format is incorrect" } }}
                                render={({ field: { name, value, onChange }, fieldState: { error }, formState }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={name}
                                        label="Last Name"
                                        name={name}
                                        autoComplete="lastName"
                                        type="text"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="clientInfo.email"
                                defaultValue=""
                                rules={{ required: { value: true, message: 'Invalid input' }, pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email format is incorrect" } }}
                                render={({ field: { name, value, onChange }, fieldState: { error }, formState }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={name}
                                        label="Email Address"
                                        name={name}
                                        autoComplete="email"
                                        type="email"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="clientInfo.phone"
                                defaultValue=""
                                rules={{
                                    required: { value: true, message: 'Invalid input' },
                                    pattern: { value: /^[0-9]{10}$/, message: "Phone number is invalid, it must be 10 digits without any space or other characters" }
                                }}
                                render={({ field: { name, value, onChange }, fieldState: { error }, formState }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id={name}
                                        label="Phone Number"
                                        name={name}
                                        autoComplete="phone"
                                        type="tel"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            /></React.Fragment>}
                    </CardContent>
                </Card>

                {bookingData.rooms.map((room) => {
                    return (<Card key={room.RoomId} sx={{ boxShadow: 3, p: 1 }}>
                        <CardContent
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <Typography gutterBottom variant="h6" component="div">
                                {room.Description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Max guests: {Array.from({ length: room.SleepsCount }).map((_, k) => (
                                    <PersonIcon key={k} sx={{ verticalAlign: "bottom" }} />
                                ))}
                            </Typography>
                            {room.Tags && room.Tags.map((tag, tagIndex) => (
                                <Chip sx={{ mr: 1 }} label={tag} key={tagIndex} color="primary" variant="outlined" />
                            ))}
                        </CardContent></Card>);
                }
                )
                }

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Use flexbox to align the button */}
                    <Button
                        variant="contained" size="large"
                        onClick={handleSubmit(onSubmit)}
                        color="primary"
                        sx={{ mt: 2, alignSelf: 'flex-end' }}  // Align the button to the end of the flex container
                    >
                        Next
                    </Button>
                </Box>
            </Stack >);
    }
};


export default ClientDetails;