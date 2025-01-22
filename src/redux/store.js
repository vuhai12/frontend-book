import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slides/userSlice";
import bookReducer from "./slides/bookSlice";
import cartReducer from "./slides/cartSlice";
import orderReducer from "./slides/orderSlice";
import profileUserReducer from "./slides/profileUserSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "order"], // Specify reducers to persist
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  book: bookReducer,
  profileUser: profileUserReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore persist actions in serializable checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor instance
export const persistor = persistStore(store);
