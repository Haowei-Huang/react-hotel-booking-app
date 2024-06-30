import React, { useState, useReducer, createContext, useEffect } from 'react';


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
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        // load user data
        try {
            const response = await fetch(DB_URL + '/document/findAll/users', requestOptions);
            const responseData = await response.json();
            userData = responseData.data;
        } catch (error) {
            console.error('Error during register:', error);
        }

        // load hotel data
        try {
            const response = await fetch(DB_URL + '/document/findAll/hotels', requestOptions);
            const responseData = await response.json();
            hotelData = responseData.data;
        } catch (error) {
            console.error('Error during register:', error);
        }

        // load booking data
        try {
            const response = await fetch(DB_URL + '/document/findAll/bookings', requestOptions);
            const responseData = await response.json();
            bookingData = responseData.data;
        } catch (error) {
            console.error('Error during register:', error);
        }

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