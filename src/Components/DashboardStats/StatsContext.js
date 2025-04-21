import React, { useState, useReducer, createContext, useEffect } from 'react';
import { findAllUsers } from '../../Helpers/users';
import { findAllHotels } from '../../Helpers/hotels';
import { findAllBookings } from '../../Helpers/bookings';

const StatsContext = createContext();

const initialStats = {
    isLoaded: false
};

const StatsReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                users: action.payload.data.users,
                hotels: action.payload.data.hotels,
                bookings: action.payload.data.bookings
            };
        case 'setIsLoaded':
            return {
                ...state,
                isLoaded: true
            };
        default: return state;
    }
};

export const StatsContextProvider = ({ children }) => {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    // store the data from backend
    const [stats, dispatch] = useReducer(StatsReducer, initialStats);

    useEffect(() => {
        loadStats();
    }, []);


    const loadStats = async () => {
        var hotelData;
        var userData;
        var bookingData;

        // load data
        userData = await findAllUsers();
        hotelData = await findAllHotels();
        bookingData = await findAllBookings();

        if (userData && hotelData && bookingData) {
            dispatch({
                type: 'initialize',
                payload: {
                    data: {
                        users: userData,
                        hotels: hotelData,
                        bookings: bookingData
                    }
                }
            });
        }

        dispatch({
            type: 'setIsLoaded'
        });
    }


    return (
        <StatsContext.Provider value={{ dispatch, stats }} >
            {children}
        </StatsContext.Provider>);
};

export default StatsContext;