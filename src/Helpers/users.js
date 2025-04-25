import api from '../features/interceptor';
const FIND_ALL_USERS = '/document/findAll/users';
const GET_USER_COUNT = '/document/countDocuments/users';
const USER_LOGIN = '/user/login';
const USER_LOGOUT = '/user/logout';
const USER_REGISTER = '/user/register';


export async function findAllUsers() {
    console.log('findAllUsers called');
    try {
        const response = await api.get(FIND_ALL_USERS);
        const responseJson = await response.data;
        console.log('responseJson', responseJson);
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function findUserById(userId) {
    console.log('findUserById called: ', userId);
    try {
        const response = await api.get(`/document/findOne/users/${userId}`);
        const responseJson = await response.data;
        console.log('responseJson', responseJson);
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function findUserByEmail(userEmail) {
    console.log('findUserByEmail called: ', userEmail);
    try {
        const response = await api.get(`/user/findUserByEmail/${userEmail}`);
        const responseJson = await response.data;
        console.log('responseJson', responseJson);
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function getUserCount() {
    console.log('getUserCount called');
    try {
        const response = await api.get(GET_USER_COUNT);
        const responseJson = await response.data;
        console.log('responseJson', responseJson);
        return responseJson.count;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function userLogin(email, password) {
    console.log('userLogin called: ', email);
    const loginData = JSON.stringify({ email: email, password: password });
    try {
        const response = await api.post(USER_LOGIN, loginData);
        if (response.status === 200) {
            const responseJson = await response.data;
            console.log('responseJson', responseJson);
            return responseJson; // not sure
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

// send logout request to server, delete the refresh token from the database
export async function userLogout() {
    try {
        const response = await api.post(USER_LOGOUT);
        if (response.status === 200) {
            // const responseJson = await response.data;
            // console.log('responseJson', responseJson);
            return true;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false; // error occurred
    }
}

export async function userRegister(email, password, role) {
    console.log('userRegister called: ', email);
    const registrationData = JSON.stringify({ email: email, password: password, role: role, isActive: true });

    try {
        const response = await api.post(USER_REGISTER, registrationData);
        if (response.status === 200) {
            const responseJson = await response.data;
            console.log('responseJson', responseJson);
            return responseJson; // not sure
        } else {
            throw new Error('Register failed');
        }
    } catch (error) {
        console.error('Error during register:', error);
    }
}

export async function updateUser(userId, newData) {
    console.log('updateUser called: ', userId);
    const newUserData = JSON.stringify({
        ...newData
    });

    try {
        const response = await api.put(`/document/updateOne/users/${userId}`, newUserData);
        await response.data;
        return true; // update successfully
    } catch (error) {
        console.error('Error during updating user data:', error);
        return false; // error occurred
    }
}

export async function deleteUser(userId) {
    console.log('deleteUser called: ', userId);
    try {
        await api.delete(`/document/deleteOne/users/${userId}`);
        return true;
    } catch (error) {
        console.error('Error during deleting user data:', error);
        return false; // error occurred
    }
}