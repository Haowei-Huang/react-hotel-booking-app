import React, { useState, useReducer, createContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const ManageUsersContext = createContext();

const initialUserTable = {
    itemList: []
};

const userTableReducer = (state, action) => {
    switch (action.type) {
        case 'initialize':
            return {
                ...state,
                itemList: action.payload.data
            };
        case 'deleteUser':
            return {
                ...state,
                itemList: state.itemList.filter(item => item._id !== action.payload._id)
            };
        case 'createUser':
            return {
                ...state,
                itemList: [...state.itemList, action.payload]
            };
        case 'updateUser':
            return {
                ...state,
                itemList: state.itemList.map(item => item._id !== action.payload._id ? item : action.payload)
            };
        default: return state;
    }
};

export const ManageUsersProvider = ({ children }) => {
    const DB_URL = process.env.REACT_APP_DB_URL;
    const [userTable, dispatch] = useReducer(userTableReducer, initialUserTable);
    const methods = useForm({
        defaultValues: {
            _id: null,
            email: '',
            role: 'user',
            password: ''
        }
    });

    const reloadUserTable = () => {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
        };

        fetch(DB_URL + '/document/findAll/users', requestOptions)
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
            });;
    }

    useEffect(() => {
        reloadUserTable();
    }, []);

    return (<FormProvider {...methods}>
        <ManageUsersContext.Provider value={{ dispatch, userTable, reloadUserTable, methods }} >
            {children}
        </ManageUsersContext.Provider>
    </FormProvider>);
};

export default ManageUsersContext;