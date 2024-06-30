import { Box, CircularProgress, Container, Typography } from "@mui/material"
import { Routes, Route, Link } from 'react-router-dom';
import ViewHotels from "./ViewHotels";
import React, { Suspense } from "react";
import { HotelDisplayProvider } from "./HotelDisplayContext";
import HotelDetails from "./HotelDetails";
import { BookingContextProvider } from "../Booking/BookingContext";

const LazyViewHotels = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import("./ViewHotels")), 2000)
    })
});

function HotelHome() {
    return (<Container maxWidth={false} disableGutters>
        <HotelDisplayProvider>
            <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>}>
                <Routes>
                    <Route index element={<LazyViewHotels />} />
                    <Route path=":id/*" element={<BookingContextProvider>
                        <HotelDetails />
                    </BookingContextProvider>
                    } />
                </Routes>
            </Suspense >
        </HotelDisplayProvider>
    </Container>);
};


export default HotelHome;