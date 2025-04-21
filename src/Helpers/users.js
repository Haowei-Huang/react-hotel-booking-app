const DB_URL = process.env.REACT_APP_DB_URL;
const FIND_ALL_USERS = DB_URL + '/document/findAll/users';
const GET_USER_COUNT = DB_URL + '/document/countDocuments/users';
const USER_LOGIN = DB_URL + '/user/login';
const USER_REGISTER = DB_URL + '/user/register';

export async function findAllUsers() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(FIND_ALL_USERS, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

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

export async function findUserByEmail(userEmail) {
    try {
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                // "Authorization": jwtToken,
                "Content-Type": "application/json"
            })
        };

        const response = await fetch(DB_URL + `/user/findUserByEmail/${userEmail}`, requestOptions);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function getUserCount() {
    const requestOptions = {
        method: "GET",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
    };

    try {
        const response = await fetch(GET_USER_COUNT, requestOptions);
        const responseJson = await response.json();
        return responseJson.count;
    } catch (error) {
        console.error('Error during fetching user data:', error);
    }
}

export async function userLogin(email, password) {
    const requestOptions = {
        method: "POST",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ email: email, password: password })
    };

    try {
        const response = await fetch(USER_LOGIN, requestOptions);
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

export async function userRegister(email, password, role) {
    const requestOptions = {
        method: "POST",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ email: email, password: password, role: role, isActive: true })
    };

    try {
        const response = await fetch(USER_REGISTER, requestOptions);
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        } else {
            throw new Error('Register failed');
        }
    } catch (error) {
        console.error('Error during register:', error);
    }
}

export async function updateUser(userId, newData) {
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
        const response = await fetch(DB_URL + `/document/updateOne/users/${userId}`, requestOptions);
        await response.json();
        return true; // update successfully
    } catch (error) {
        console.error('Error during updating user data:', error);
        return false; // error occurred
    }
}

export async function deleteUser(userId) {
    const requestOptions = {
        method: "DELETE",
        headers: new Headers({
            // "Authorization": jwtToken,
            "Content-Type": "application/json"
        })
    };

    try {
        await fetch(DB_URL + `/document/deleteOne/users/${userId}`, requestOptions);
        return true;
    } catch (error) {
        console.error('Error during deleting user data:', error);
        return false; // error occurred
    }
}