const DB_URL = process.env.REACT_APP_DB_URL;
const FIND_ALL_BOOKINGS = DB_URL + '/document/findAll/bookings';

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
        console.error('Error during fetching hotel data:', error);
    }
}