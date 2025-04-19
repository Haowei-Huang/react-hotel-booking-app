const DB_URL = process.env.REACT_APP_DB_URL;

export async function findUserById(userId) {
    try {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            })
        };
        const response = await fetch(DB_URL + `/document/findOne/users/${userId}`, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

