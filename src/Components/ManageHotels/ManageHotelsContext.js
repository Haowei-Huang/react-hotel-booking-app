import React, { useState, useReducer, createContext, useEffect } from 'react';

const ManageHotelsContext = createContext();

const initialHotelTable = {
    itemList: []
};

const hotelTableReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                itemList: action.payload.data
            };
        default: return state;
    }
};

export const ManageHotelsProvider = ({ children }) => {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    const [hotelTable, dispatch] = useReducer(hotelTableReducer, initialHotelTable);

    const reloadHotelTable = () => {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        fetch(DB_URL + '/document/findAll/hotels', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch({
                    type: 'initialize',
                    payload: {
                        'data': data.data,
                    }
                });
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        reloadHotelTable();
    }, []);

    return (
        <ManageHotelsContext.Provider value={{ dispatch, hotelTable, reloadHotelTable }} >
            {children}
        </ManageHotelsContext.Provider>
    );
};

export default ManageHotelsContext;