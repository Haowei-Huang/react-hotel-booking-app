import React, { useState, useReducer, createContext, useEffect } from 'react';

const HotelDisplayContext = createContext();

const initialHotelList = {
    itemList: []
};

const hotelListReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                itemList: action.payload.data.filter(hotel => hotel.isActive) // only load active hotel
            };
        default: return state;
    }
};

export const HotelDisplayProvider = ({ children }) => {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const DB_URL = process.env.REACT_APP_DB_URL;
    // store the data from backend
    const [hotelList, dispatch] = useReducer(hotelListReducer, initialHotelList);

    useEffect(() => {
        loadHotelList();
    }, []);


    const loadHotelList = () => {
        // const loadData = () => JSON.parse(JSON.stringify(jsonData));
        // dispatch({
        //     type: 'initialize',
        //     payload: {
        //         'data': loadData().data,
        //     }
        // });

        const requestOptions = {
            method: "GET",
            headers: new Headers({
                //  "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        console.log(DB_URL);

        fetch(DB_URL + '/document/findAll/hotels', requestOptions)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'initialize',
                    payload: {
                        'data': data.data,
                    }
                });
            }).catch(error => console.error('Error:', error));;
    }

    return (
        <HotelDisplayContext.Provider value={{ dispatch, hotelList, loadHotelList }} >
            {children}
        </HotelDisplayContext.Provider>);
};

export default HotelDisplayContext;