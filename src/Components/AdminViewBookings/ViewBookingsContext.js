import React, { useState, useReducer, createContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ViewBookingsContext = createContext();

const initialBookingTable = {
    isLoaded: false,
    itemList: []
};

const bookingTableReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                itemList: action.payload.data
            };
        case 'setIsLoaded':
            return {
                ...state,
                isLoaded: true
            };
        default: return state;
    }
};

export const ViewBookingsProvider = ({ children }) => {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    const [bookingTable, dispatch] = useReducer(bookingTableReducer, initialBookingTable);

    const reloadBookingTable = () => {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        fetch(DB_URL + '/document/findAll/bookings', requestOptions)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'initialize',
                    payload: {
                        'data': data.data,
                    }
                });
            }).catch(error => {
                console.error('Error:', error);
            });
        dispatch({
            type: 'setIsLoaded'
        });
    }

    useEffect(() => {
        reloadBookingTable();
    }, []);

    return (
        <ViewBookingsContext.Provider value={{ dispatch, bookingTable, reloadBookingTable }} >
            {children}
        </ViewBookingsContext.Provider>
    );
};

export default ViewBookingsContext;