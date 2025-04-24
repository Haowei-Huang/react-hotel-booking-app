import React, { useState, useEffect, useContext, useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import ManageHotelsContext from './ManageHotelsContext';
import { Link } from 'react-router-dom';
import { updateHotel } from '../../helpers/hotels';

// only for display, should have functionality from Context for delete and edit
function HotelDataTable() {
    const { dispatch, hotelTable, reloadHotelTable } = useContext(ManageHotelsContext);
    const DB_URL = process.env.REACT_APP_DB_URL;

    const handleEdit = async (row) => {
        console.log(row);
        const hotelId = row._id;
        // const jwtToken = process.env.REACT_APP_JWT_TOKEN;

        const newData = {
            ...row,
            isActive: !row.isActive
        }

        const isUpdated = await updateHotel(hotelId, newData);

        if (isUpdated) {
            reloadHotelTable();
        }
    };

    const columns = [{ field: '_id', headerName: 'ID', width: 230 },
    {
        field: 'isActive',
        headerName: 'isActive',
        width: 80,
        editable: false
    },
    {
        field: 'HotelName',
        headerName: 'Hotel Name',
        width: 200,
        editable: false
    },
    {
        field: 'Rating',
        headerName: 'Rating',
        width: 70,
        editable: false
    },
    {
        field: 'Street',
        headerName: 'Street',
        valueGetter: (params) => {
            return params.row.Address ? `${params.row.Address.StreetAddress}` : '';
        },
        width: 150,
        editable: false
    },
    {
        field: 'City',
        headerName: 'City',
        valueGetter: (params) => {
            return params.row.Address ? `${params.row.Address.City}` : '';
        },
        width: 100,
        editable: false
    },
    {
        field: 'Province',
        headerName: 'Province',
        valueGetter: (params) => {
            return params.row.Address ? `${params.row.Address.StateProvince}` : '';
        },
        width: 80,
        editable: false
    },
    {
        field: 'PostalCode',
        headerName: 'PostalCode',
        valueGetter: (params) => {
            return params.row.Address ? `${params.row.Address.PostalCode}` : '';
        },
        width: 120,
        editable: false
    },
    {
        field: 'Country',
        headerName: 'Country',
        valueGetter: (params) => {
            return params.row.Address ? `${params.row.Address.Country}` : '';
        },
        width: 100,
        editable: false
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 180,
        renderCell: ({ row }) => {
            return (
                <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                    <Button variant="outlined" color="primary" size="small" onClick={() => (handleEdit(row))}>{row.isActive ? "Deactivate" : "Activate"}</Button>
                    <Button variant="outlined" color="primary" size="small" component={Link} to={`/Dashboard/ManageHotels/${row._id}`}>View</Button>
                </Stack>
            );
        }
    }
    ];

    const rows = hotelTable.itemList;

    return (
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
    );
};

export default HotelDataTable;