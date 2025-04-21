import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box, Stack, Divider, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HotelOverview = ({ hotel }) => {
    // Destructure the hotel object for easier access to its properties.
    const { Photo, HotelName, Description, Rating: hotelRating, Address, Tags } = hotel;

    // Ensure Address is an object with the necessary properties.
    const fullAddress = Address
        ? `${Address.StreetAddress}, ${Address.City}, ${Address.StateProvince}, ${Address.PostalCode}, ${Address.Country}`
        : 'Address not available';

    return (
        <Card sx={{}}>
            <CardMedia
                component="img"
                height="300"
                image={Photo}
                alt={HotelName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {HotelName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {Description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
                    <Rating value={parseFloat(hotelRating)} precision={0.5} readOnly />
                    <Typography sx={{ ml: 1 }} variant="subtitle1" color="text.secondary">
                        {hotelRating}
                    </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {fullAddress}
                    </Typography>
                </Stack>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {Tags && Tags.map((tag, index) => (
                        <Chip label={tag} key={index} />
                    ))}
                </Box>
            </CardContent>
            <Divider />
        </Card>
    );

};

export default HotelOverview;
