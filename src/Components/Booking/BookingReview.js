import { Box, Card, CardContent, Divider, Grid, Stack, Typography, Container, Button, Alert } from "@mui/material";
import React, { useContext, useState } from "react";
import BookingContext from "./BookingContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { createBooking } from "../../Helpers/bookings";;

function BookingReview({ prevStep }) {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const { bookingData, dispatch } = useContext(BookingContext);
    const sessionKey = useSelector(state => state.auth.sessionKey);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [isBookingFailed, setIsBookingFailed] = useState(false);
    const DB_URL = process.env.REACT_APP_DB_URL;

    const goBack = () => {
        prevStep();
        navigate(-1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if log in, save the user id
        // save order time
        // save only hotel Id and room Id
        const roomIdList = bookingData.rooms.map(room => room.RoomId);
        const hotelId = bookingData.hotel._id;

        setBookingDetail({
            ...bookingData,
            hotel: hotelId,
            rooms: roomIdList,
            userId: sessionKey || '',
            time: dayjs()
        });

        if (bookingDetail) {
            const { isBookingSuccess, ...pureBookingData } = bookingDetail;
            const isBookingCreated = await createBooking(pureBookingData);

            if (isBookingCreated) {
                dispatch({ type: "setIsBookingSuccess" }); // make the order details not visible
                navigate("../success");
            } else {
                dispatch({ type: "setIsBookingFailed" });
                setIsBookingFailed(true); // set the alert to visible
            }
        } else {
            setIsBookingFailed(true); // set the alert to visible
            return;
        }
    }

    return (
        <Container maxWidth="md">
            <Stack direction="column" spacing={2}>
                <Card sx={{ mb: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Personal Details
                        </Typography>
                        <Stack direction="row" spacing={8}>
                            <Stack>
                                <Typography variant="body1" gutterBottom>
                                    First Name
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Last Name
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Phone
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.clientInfo.firstName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.clientInfo.lastName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.clientInfo.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.clientInfo.phone}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ my: 2 }} gutterBottom>
                                    Billing Address
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.cardInfo.address.street}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.cardInfo.address.city}, {bookingData.cardInfo.address.province}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {bookingData.cardInfo.address.postalCode}, {bookingData.cardInfo.address.country.toUpperCase()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ my: 2 }} gutterBottom>
                                    Payment Details
                                </Typography>
                                <Stack direction="row" spacing={8}>
                                    <Stack>
                                        <Typography variant="body1" gutterBottom>
                                            Card Holder Name
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Card Number
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Expiry Date
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="body1" gutterBottom>
                                            {bookingData.cardInfo.cardName}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {"xxxx-xxxx-xxxx-" + bookingData.cardInfo.cardNumber.slice(-4)}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {`${bookingData.cardInfo.expDate.substring(0, 2)}/${bookingData.cardInfo.expDate.substring(2)}`}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Use flexbox to align the button */}
                    <Button
                        size="large"
                        onClick={goBack}
                        color="primary"
                        sx={{ mr: 2, alignSelf: 'flex-end' }}  // Align the button to the end of the flex container
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained" size="large"
                        onClick={handleSubmit}
                        color="primary"
                        sx={{ alignSelf: 'flex-end' }}  // Align the button to the end of the flex container
                    >
                        Confirm
                    </Button>
                </Box>
                {isBookingFailed && <Alert severity="error">"Something went wrong, please try again"</Alert>}
            </Stack>
        </Container>
    );
}

export default BookingReview;
