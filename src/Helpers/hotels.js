const DB_URL = process.env.REACT_APP_DB_URL;

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