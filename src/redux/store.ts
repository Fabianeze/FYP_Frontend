import { combineReducers, configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slices/input";
import authReducer from "./slices/auth-slice";
import { apiSlice } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import storageSession from "redux-persist/lib/storage/session"
import { persistStore, persistReducer} from "redux-persist";
import passwordSlice from "./slices/password-slice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducers= combineReducers({
  auth: authReducer,
  input: inputReducer,
  password:passwordSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
})



const persistedReducer=persistReducer(persistConfig,rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor= persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
