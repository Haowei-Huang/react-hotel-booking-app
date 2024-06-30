import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        isAuthenticated: false,
        username: null,
        sessionKey: null,
        role: 'user'
    },

    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.sessionKey = action.payload.sessionKey;
            state.role = action.payload.role;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.username = null;
            state.sessionKey = null;
            state.role = 'user';
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;