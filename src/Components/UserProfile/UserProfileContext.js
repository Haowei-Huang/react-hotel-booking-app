import React, { useState, useReducer, createContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const UserProfileContext = createContext();
const initialUserProfile = {};

const userProfileReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...action.payload.data
            };
        default: return state;
    }
};

export const UserProfileContextProvider = ({ children }) => {
    const DB_URL = process.env.REACT_APP_DB_URL;
    const sessionKey = useSelector(state => state.auth.sessionKey);
    // store the data from backend
    const [userProfile, dispatch] = useReducer(userProfileReducer, initialUserProfile);

    useEffect(() => {
        loadUserProfile();
        //console.log(userProfile);
    }, []);


    const loadUserProfile = async () => {
        var userData;
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        try {
            const response = await fetch(DB_URL + `/document/findOne/users/${sessionKey}`, requestOptions);
            const responseData = await response.json();
            userData = responseData.data;
        } catch (error) {
            console.error('Error during finding user:', error);
        }

        if (userData) {
            console.log(userData);
            dispatch({
                type: 'initialize',
                payload: {
                    data: userData
                }
            })
        } else {
            console.log("Failed to load user profile data");
        }
    }

    return (
        <UserProfileContext.Provider value={{ dispatch, userProfile, loadUserProfile }} >
            {children}
        </UserProfileContext.Provider>);
};

export default UserProfileContext;