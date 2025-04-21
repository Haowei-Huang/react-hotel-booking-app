const DB_URL = process.env.REACT_APP_DB_URL;
const FIND_ALL_HOTELS = DB_URL + '/document/findAll/hotels';
const GET_HOTEL_COUNT = DB_URL + '/document/countDocuments/hotels';


export async function findAllHotels() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(FIND_ALL_HOTELS, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching hotel data:', error);
    }
}

export async function findHotelById(hotelId) {
    try {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            })
        };
        const response = await fetch(DB_URL + `/document/findOne/hotels/${hotelId}`, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching hotel data:', error);
    }
}

export async function getHotelCount() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(GET_HOTEL_COUNT, requestOptions);
        const responseJson = await response.json();
        return responseJson.count;
    } catch (error) {
        console.error('Error during fetching hotel data:', error);
    }
}

export async function updateHotel(hotelId, newData) {
    const requestOptions = {
        method: "PUT",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            ...newData
        })
    };

    try {
        const response = await fetch(DB_URL + `/document/updateOne/hotels/${hotelId}`, requestOptions);
        await response.json();
        return true; // update successfully
    } catch (error) {
        console.error('Error during updating hotel data:', error);
        return false; // error occurred
    }
}

export async function getUserBookedHotels(userId) {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(DB_URL + `/hotel/getUserBookedHotels/${userId}`, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching hotel data:', error);
    }
}