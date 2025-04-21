const DB_URL = process.env.REACT_APP_DB_URL;
const LOGIN_URL = DB_URL + '/user/login';

export async function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ username, password })
    };

    try {
        const response = await fetch(LOGIN_URL, requestOptions);
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}