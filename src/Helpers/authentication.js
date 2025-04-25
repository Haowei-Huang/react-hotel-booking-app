import api from '../features/interceptor';
const DB_URL = process.env.REACT_APP_DB_URL;
const LOGIN_URL = DB_URL + '/user/login';

export async function login(username, password) {
    const loginData = JSON.stringify({ username: username, password: password });

    try {
        // const response = await fetch(LOGIN_URL, requestOptions);
        const response = await api.post(LOGIN_URL, loginData);
        if (response.ok) {
            const responseJson = await response.data;
            return responseJson;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}