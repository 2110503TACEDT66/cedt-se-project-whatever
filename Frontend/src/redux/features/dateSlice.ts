import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type DateState = {
    bookdate : {date:string,symptom:string}
}
const initialState:DateState = {bookdate:{date:"",symptom:""}}

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers:{
        changeBookingDate:(state, action:PayloadAction<string>)=>{
            state.bookdate.date=action.payload;
        },
        resetbookdate:(state, action:PayloadAction<null>)=>{
            state.bookdate.date="";
        },
        changeSymptom:(state, action:PayloadAction<string>)=>{
            state.bookdate.symptom=action.payload;
        },
        resetSymptom:(state, action:PayloadAction<null>)=>{
            state.bookdate.symptom="";
        },
    }
})
export const { changeBookingDate,resetbookdate,changeSymptom,resetSymptom} = dateSlice.actions
export default dateSlice.reducer