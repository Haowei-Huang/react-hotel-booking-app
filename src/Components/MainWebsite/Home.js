import { Box, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from "../../ProtectedRoute";
import HotelHome from "../Hotels/HotelHome";
import { WelcomePage } from "./WelcomePage";
import { useState } from "react";
import { SearchContextProvider } from "../SearchHotelContext/SearchContext";
import MainHeader from "./Header";
import BookingHome from "../UserViewBooking/BookingHome";
import ProtectedUserRoute from "../../ProtectedUserRoute";
import UserProfileHome from "../UserProfile/UserProfileHome";

function Home() {

    return (<Container maxWidth={false} disableGutters>
        <MainHeader />
        <SearchContextProvider>
            <Routes>
                <Route index element={<WelcomePage />} />
                <Route path="/Hotels/*" element={<HotelHome />} />
                <Route path="/UserProfile/*" element={<ProtectedUserRoute>
                    <UserProfileHome />
                </ProtectedUserRoute>} />
                <Route path="/Bookings/*" element={<ProtectedUserRoute>
                    <BookingHome />
                </ProtectedUserRoute>} />
            </Routes>
        </SearchContextProvider>
    </Container >);
}

export default Home;