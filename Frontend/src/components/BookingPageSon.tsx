'use client'
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch,useAppSelector } from "@/redux/store"
import { changeBookingDate } from "@/redux/features/dateSlice";
import DentistCatalog from '@/components/DentistCatalog'
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import DateReserve from "@/components/DateReserve"



export default function BookingPagSon({dentistJson}:{dentistJson:DentistJson}){
    const bookingDate=useAppSelector((state)=>{return state.dateSlice.bookdate.date})
    const dispatch = useDispatch<AppDispatch>()
    return(
        <div className="flex flex-col">
            <div className="w-[100%] flex flex-row justify-center my-5 items-center">
                <div className="m-5 text-xl font-bold font-serif "> Date :</div>
                <DateReserve onDateChange={(value:Dayjs)=>{let vv= dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS")+'Z';dispatch(changeBookingDate(vv))}}/>
                <div>
                    
                </div> 
            </div>
            <h1 className='text-xl font-medium'>Available Dentist</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <DentistCatalog dentistsJson={dentistJson} date={bookingDate}/>
            </Suspense>
      
        </div>
    )
}