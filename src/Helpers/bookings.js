const DB_URL = process.env.REACT_APP_DB_URL;
const FIND_ALL_BOOKINGS = DB_URL + '/document/findAll/bookings';
const GET_BOOKING_COUNT = DB_URL + '/document/countDocuments/bookings';

export async function findAllBookings() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(FIND_ALL_BOOKINGS, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching booking data:', error);
    }
}

export async function findBookingByUserId(userId) {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            //"Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(DB_URL + `/booking/findBookingByUserId/${userId}`, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching booking data:', error);
    }
}

export async function createBooking(bookingData) {
    const requestOptions = {
        method: "POST",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            ...bookingData
        })
    };

    try {
        const response = await fetch(DB_URL + "/document/createorupdate/bookings", requestOptions);
        await response.text();
        return true; // Booking created successfully
    } catch (error) {
        console.error('Error during creating booking:', error);
        return false; // Error occurred
    }
}

export async function getBookingCount() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(GET_BOOKING_COUNT, requestOptions);
        const responseJson = await response.json();
        return responseJson.count;
    } catch (error) {
        console.error('Error during fetching hotel data:', error);
    }
}