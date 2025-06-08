import React, { useState, useEffect, useContext, useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import ManageHotelsContext from './ManageHotelsContext';
import { Link } from 'react-router-dom';
import { updateHotel } from '../../helpers/hotels';

// only for display, should have functionality from Context for delete and edit
function HotelDataTable() {
    const { dispatch, hotelTable, reloadHotelTable } = useContext(ManageHotelsContext);

    const handleEdit = async (row) => {
        //console.log(row);
        const hotelId = row._id;

        const newData = {
            ...row,
            isActive: !row.isActive
        }

        const isUpdated = await updateHotel(hotelId, newData);

        if (isUpdated) {
            await reloadHotelTable();
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
        field: 'hotelName',
        headerName: 'Hotel Name',
        width: 200,
        editable: false
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 70,
        editable: false
    },
    {
        field: 'street',
        headerName: 'Street',
        valueGetter: (value, row) => {
            return row.address ? `${row.address.street}` : '';
        },
        width: 150,
        editable: false
    },
    {
        field: 'city',
        headerName: 'City',
        valueGetter: (value, row) => {
            return row.address ? `${row.address.city}` : '';
        },
        width: 100,
        editable: false
    },
    {
        field: 'province',
        headerName: 'Province',
        valueGetter: (value, row) => {
            return row.address ? `${row.address.province}` : '';
        },
        width: 80,
        editable: false
    },
    {
        field: 'postalCode',
        headerName: 'PostalCode',
        valueGetter: (value, row) => {
            return row.address ? `${row.address.postalCode}` : '';
        },
        width: 120,
        editable: false
    },
    {
        field: 'country',
        headerName: 'Country',
        valueGetter: (value, row) => {
            return row.address ? `${row.address.country}` : '';
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 1 }}>
                    <Button variant="outlined" color="primary" size="small" onClick={() => (handleEdit(row))}>{row.isActive ? "Deactivate" : "Activate"}</Button>
                    <Button variant="outlined" color="primary" size="small" component={Link} to={`/Dashboard/ManageHotels/${row._id}`}>View</Button>
                </Box>
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
                        pageSize: 10,
                    },
                },
            }}
            sx={{
                boxShadow: 2,
                border: 1,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
                bgcolor: '#f8fafc'
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
        />
    );
};

export default HotelDataTable;