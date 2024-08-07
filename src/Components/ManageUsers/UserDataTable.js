import React, { useState, useEffect, useContext, useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../authSlice';
import { useFormContext } from 'react-hook-form';
import ManageUsersContext from './ManageUsersContext';

// only for display, should have functionality from Context for delete and edit
function UserDataTable() {
    const { control, handleSubmit, reset, formState: { errors, isSubmitted, isSubmitSuccessful, isValid }, watch, setError, clearErrors, setValue, getValues }
        = useFormContext();
    const sessionKey = useSelector(state => state.auth.sessionKey);
    const { dispatch, userTable, reloadUserTable } = useContext(ManageUsersContext);
    const DB_URL = process.env.REACT_APP_DB_URL;

    const handleDelete = (row) => {
        //console.log(row);
        const _id = row._id;
        // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
        const requestOptions = {
            method: "DELETE",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            })
        };

        if (sessionKey === _id) {
            setError("email", { type: 'custom', message: 'You can\'t delete your own account' });
            return;
        } else {
            fetch(DB_URL + `/document/deleteOne/users/${_id}`, requestOptions)
                .then(res => res.json())
                .then(res => {
                    if (getValues("email").toLowerCase() === row.email.toLowerCase()) {
                        reset();
                    }
                })
                .then(data => {
                    reloadUserTable();
                }).catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const handleEdit = (row) => {
        reset(row);
    }

    const columns = [{ field: '_id', headerName: 'ID', width: 250 },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: false
    },
    {
        field: 'password',
        headerName: 'Password',
        width: 180,
        editable: false
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 110,
        editable: false
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 180,
        renderCell: ({ row }) => {
            return (
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="primary" size="small" onClick={() => (handleEdit(row))}>Edit</Button>
                    <Button variant="outlined" color="primary" size="small" onClick={() => (handleDelete(row))}>Delete</Button>
                </Stack>
            );
        }
    }
    ];

    const rows = userTable.itemList;

    return (
        <Box sx={{ height: 800, width: '100%', pt: 5 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                getRowId={(row) => row._id}
                disableRowSelectionOnClick
            />
        </Box >
    );
};

export default UserDataTable;