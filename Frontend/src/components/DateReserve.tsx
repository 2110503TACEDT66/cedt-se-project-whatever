'use client'
import {DateTimePicker} from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useState } from 'react';



export default function DateReserve({onDateChange}:{onDateChange:Function}){
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    return(
        <div className='rounded-xl space-x-5 space-y-2 w-fit flex flex-row justify-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateTimePicker 
                views={['year','day', 'hours']} 
                className='bg-white'
                disablePast
                value={bookingDate}
                onChange={(value)=>{setBookingDate(value); onDateChange(value)}}
                slotProps={{ textField: { size: 'small' } }}/>
            </LocalizationProvider>
        </div>
    );
}