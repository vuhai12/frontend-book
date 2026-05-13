import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookReducer from "./slides/bookSlice";
import reviewsReducer from "./slides/reviewsSlice";
import cartReducer from "./slides/cartSlice";

import collectionsReducer from "./slides/collectionSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["collections"], // Specify reducers to persist
};

// Combine reducers
const rootReducer = combineReducers({
  collections: collectionsReducer,
  book: bookReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor instance
export const persistor = persistStore(store);
