import React, { useState, useEffect, useContext, useReducer } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import ViewBookingsContext from './ViewBookingsContext';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { findHotelById } from '../../helpers/hotels';
import { findUserById } from '../../helpers/users';

// only for display, should have functionality from Context for delete and edit
function BookingDataTable() {
    // const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const { dispatch, bookingTable, reloadBookingTable } = useContext(ViewBookingsContext);
    const navigate = useNavigate();

    const checkBookingDetails = async (row) => {
        var hotelData;
        var userData;

        console.log("Booking data: ", row.hotel);
        // get hotel data
        try {
            const hotelDataResponse = await findHotelById(row.hotel);
            hotelData = hotelDataResponse;
        } catch (error) {
            console.error('Error during fetching hotel data:', error);
            return;
        }

        //const roomsData = hotelData.Rooms.filter(room => row.rooms.includes(room.RoomId));
        if (hotelData) {
            // get the rooms' data 
            const roomsData = hotelData.Rooms.filter(room => row.rooms.includes(room.RoomId));
            const { Rooms, ...pureHotelData } = hotelData;

            //get user data
            try {
                const userDataResponse = await findUserById(row.userId);
                userData = userDataResponse;
            } catch (error) {
                console.error('Error during fetching user data:', error);
            }

            // send the booking's corresponding data through navigate
            navigate(`/Dashboard/ViewBookings/${row._id}`, {
                state: {
                    bookingDetails: {
                        ...row,
                        hotel: pureHotelData,
                        rooms: roomsData,
                        userEmail: userData ? userData.email : ''
                    }
                }
            });
        } else {
            console.error("No hotel data of this booking found");
        }
    }

    const columns = [{ field: '_id', headerName: 'ID', flex: 1 },
    {
        field: 'hotel',
        headerName: 'Hotel Id', flex: 1
    },
    {
        field: 'userId',
        headerName: 'User Id', flex: 1
    },
    {
        field: 'time',
        headerName: 'Booked at',
        width: 160,
        valueGetter: (params) => {
            return `${dayjs(params.row.time).format('MMM D, YYYY h:mm A')}`
        }, flex: 1
    },
    {
        field: 'from',
        headerName: 'From',
        width: 100,
        valueGetter: (params) => {
            return `${dayjs(params.row.from).format('MMM D, YYYY')}`
        },
        editable: false, flex: 1
    },
    {
        field: 'to',
        headerName: 'To',
        width: 100,
        valueGetter: (params) => {
            return `${dayjs(params.row.to).format('MMM D, YYYY')}`
        },
        editable: false, flex: 1
    },
    {
        field: 'totalPrice',
        headerName: 'Total Price',
        width: 110,
        valueGetter: (params) => {
            return `$${params.row.totalPrice.toFixed(2)}`
        },
        editable: false, flex: 1
    },
    {
        field: 'Cilent Fullname',
        headerName: 'Cilent Fullname',
        valueGetter: (params) => {
            return `${params.row.clientInfo.firstName} ${params.row.clientInfo.lastName}`;
        },
        width: 150,
        editable: false, flex: 1
    },
    {
        field: 'Cilent Email',
        headerName: 'Cilent Email',
        valueGetter: (params) => {
            return `${params.row.clientInfo.email}`;
        },
        width: 180,
        editable: false, flex: 1
    },
    {
        field: 'Cilent Phone',
        headerName: 'Cilent Phone',
        valueGetter: (params) => {
            return `${params.row.clientInfo.phone}`;
        },
        width: 110,
        editable: false, flex: 1
    },
    {
        field: 'Card Holder Name',
        headerName: 'Card Holder Name',
        valueGetter: (params) => {
            return `${params.row.cardInfo.cardName}`;
        },
        width: 150,
        editable: false, flex: 1
    },
    {
        field: 'Card Number',
        headerName: 'Card Number',
        valueGetter: (params) => {
            return `${params.row.cardInfo.cardNumber.substring(0, 4)}-xxxx-xxxx-${params.row.cardInfo.cardNumber.substring(params.row.cardInfo.cardNumber.length - 4)}`;
        },
        width: 200,
        editable: false, flex: 1
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 180,
        renderCell: ({ row }) => {
            return (
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="primary" size="small" onClick={() => { checkBookingDetails(row) }}>View</Button>
                </Stack>
            );
        }
    }
    ];

    const rows = bookingTable.itemList;

    if (!bookingTable.isLoaded) {
        return <CircularProgress />
    } else {
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
                autoHeight
                pageSizeOptions={[20]}
                getRowId={(row) => row._id}
                disableRowSelectionOnClick
            />
        );
    }
};

export default BookingDataTable;