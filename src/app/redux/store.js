import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";

// Configuration for Redux-Persist
const persistConfig = {
    key: "root", // Key to use for storage
    version: 1, // Version of the persisted storage
    storage, // Storage engine (localStorage in this case)
};

// Combine reducers
const reducers = combineReducers({
    cart: cartSlice, // Combining the cartSlice reducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer, // Using the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create a persistor for persisting the Redux store
export let persistor = persistStore(store);
