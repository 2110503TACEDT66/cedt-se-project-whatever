import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dateSlice from "./features/dateSlice";
import { useSelector,TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:'rootPersist',
    storage
}

export const store = configureStore({
    reducer:{dateSlice}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector