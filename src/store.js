import { configureStore } from '@reduxjs/toolkit';
import authRuducer from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authRuducer);

export const store = configureStore({
    reducer: {
        // auth: persistedAuthReducer
        auth: authRuducer
    },
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

//export const persistor = persistStore(store);
