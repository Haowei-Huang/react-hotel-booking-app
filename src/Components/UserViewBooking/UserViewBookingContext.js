import React, { useState, useReducer, createContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const UserViewBookingContext = createContext();
const initialBookingList = {
    isLoaded: false,
    bookings: [],
    hotels: []
};

const bookingListReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                bookings: action.payload.data.bookings,
                hotels: action.payload.data.hotels,
            };
        case 'setIsLoaded':
            return {
                ...state,
                isLoaded: true
            };
        default: return state;
    }
};

export const UserViewBookingContextProvider = ({ children }) => {
    //const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    const sessionKey = useSelector(state => state.auth.sessionKey);
    // store the data from backend
    const [bookingList, dispatch] = useReducer(bookingListReducer, initialBookingList);

    useEffect(() => {
        loadBookingList();
    }, []);


    const loadBookingList = async () => {
        var hotelData;
        var bookingData;
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                //"Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        // get all bookings, and filter bookings of current user
        try {
            const response = await fetch(DB_URL + '/document/findAll/bookings', requestOptions);
            const responseData = await response.json();
            bookingData = responseData.data.filter(u => u.userId === sessionKey);
        } catch (error) {
            console.error('Error during findAll bookings:', error);
        }

        // find the corresponding hotel data appears in the booking
        if (bookingData.length !== 0) {
            try {
                const response = await fetch(DB_URL + '/document/findAll/hotels', requestOptions);
                const responseData = await response.json();
                const filteredHotelIds = bookingData.map(booking => booking.hotel);
                hotelData = responseData.data.filter(hotel => filteredHotelIds.includes(hotel._id));
                console.log(hotelData);
            } catch (error) {
                console.error('Error during findAll hotels:', error);
            }
            if (hotelData.length !== 0) {
                dispatch({
                    type: 'initialize',
                    payload: {
                        data: {
                            bookings: bookingData,
                            hotels: hotelData
                        }
                    }
                })
            }
        } else {
            console.error('No booking found on server');
        }

        dispatch({
            type: 'setIsLoaded'
        });
    }

    return (
        <UserViewBookingContext.Provider value={{ dispatch, bookingList }} >
            {children}
        </UserViewBookingContext.Provider>);
};

export default UserViewBookingContext;