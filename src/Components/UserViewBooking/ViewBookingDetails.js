import { Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserViewBookingContext from "./UserViewBookingContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";

function ViewBookingDetails() {
    let { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center" sx={{ mt: 5 }}>
            <Stack direction="row" spacing={3}>
                <Stack direction="column" spacing={3} sx={{ mr: 2 }}>
                    <Card sx={{ boxShadow: 3, mb: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" color="text.secondary">
                                Hotel Info
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {location.state.bookingDetails.hotel.HotelName}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocationOnIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    {location.state.bookingDetails.hotel.Address
                                        ? `${location.state.bookingDetails.hotel.Address.StreetAddress}, ${location.state.bookingDetails.hotel.Address.City}, ${location.state.bookingDetails.hotel.Address.StateProvince}, ${location.state.bookingDetails.hotel.Address.PostalCode}, ${location.state.bookingDetails.hotel.Address.Country}`
                                        : 'Address not available'}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Your booking details</Typography>
                            <Stack direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                <Box>
                                    <Typography color="text.secondary">Check-in</Typography>
                                    <Typography variant="subtitle1">{dayjs(location.state.bookingDetails.from).format('dddd, MMMM D, YYYY')}</Typography>
                                    <Typography variant="body2">From 16:00</Typography>
                                </Box>
                                <Box>
                                    <Typography color="text.secondary">Check-out</Typography>
                                    <Typography variant="subtitle1">{dayjs(location.state.bookingDetails.to).format('dddd, MMMM D, YYYY')}</Typography>
                                    <Typography variant="body2">Until 12:00</Typography>
                                </Box>
                            </Stack>
                            <Typography color="text.secondary" mt={2}>Total length of stay:</Typography>
                            <Typography variant="body1">{location.state.bookingDetails.duration} {location.state.bookingDetails.duration > 1 ? "nights" : "night"}</Typography>
                            <Typography color="text.secondary" mt={1}>You selected</Typography>
                            <Typography variant="body1">{location.state.bookingDetails.rooms.length} {location.state.bookingDetails.rooms.length > 1 ? "rooms" : "room"} for {location.state.bookingDetails.numberOfGuest} {location.state.bookingDetails.numberOfGuest > 1 ? "guests" : "guest"}</Typography>
                            {location.state.bookingDetails.rooms.map((room) => (
                                <Typography key={room.RoomId} variant="body2" mt={0.5}>{room.Description}</Typography>
                            ))}
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Your price summary</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", bgcolor: "primary.main", color: "common.white", p: 2, borderRadius: 1 }}>
                                <Typography variant="h5">Price</Typography>
                                <Typography variant="h5">CAD {location.state.bookingDetails.totalPrice.toFixed(2)}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
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
                                        {location.state.bookingDetails.clientInfo.firstName}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.clientInfo.lastName}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.clientInfo.email}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.clientInfo.phone}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="h6" sx={{ my: 2 }} gutterBottom>
                                        Billing Address
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.cardInfo.address.street}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.cardInfo.address.city}, {location.state.bookingDetails.cardInfo.address.province}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {location.state.bookingDetails.cardInfo.address.postalCode}, {location.state.bookingDetails.cardInfo.address.country.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }} >
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
                                                {location.state.bookingDetails.cardInfo.cardName}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                {"xxxx-xxxx-xxxx-" + location.state.bookingDetails.cardInfo.cardNumber.slice(-4)}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                {`${location.state.bookingDetails.cardInfo.expDate.substring(0, 2)}/${location.state.bookingDetails.cardInfo.expDate.substring(2)}`}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box sx={{ display: 'flex', heigh: "30px", justifyContent: 'flex-end' }}> {/* Use flexbox to align the button */}
                        <Button
                            size="large"
                            onClick={goBack}
                            variant="contained"
                            color="primary"
                            sx={{ alignSelf: 'flex-end', fontSize: 20 }}  // Align the button to the end of the flex container
                        >
                            Back
                        </Button>
                    </Box>

                </Stack>
            </Stack>
        </Box>
    )
}

export default ViewBookingDetails;