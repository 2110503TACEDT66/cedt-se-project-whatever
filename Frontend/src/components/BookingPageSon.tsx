'use client';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { changeBookingDate } from '@/redux/features/dateSlice';
import DentistCatalog from '@/components/DentistCatalog';
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import DateReserve from "@/components/DateReserve"
import {Select,MenuItem} from "@mui/material"
import SortDropDown from "./SortDropDown";
import SortExpDropDown from "./SortExp"
import QuantityInput from './SortExp';




export default function BookingPagSon({dentistJson}:{dentistJson:DentistJson}){
    const bookingDate=useAppSelector((state)=>{return state.dateSlice.bookdate.date})
    const dispatch = useDispatch<AppDispatch>()
    const [expertise, setExpertise] = useState<string>('');
    const [experience, setExperience] = useState<number>(0);
    return(
        <div className="flex flex-col">
            <div className="w-[100%] flex flex-row justify-center my-4 items-center"><div className="m-5 text-xl font-bold font-serif text-cyan-500"> Date :</div><DateReserve onDateChange={(value:Dayjs)=>{let vv= dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS")+'Z';dispatch(changeBookingDate(vv))}}/><div></div>
            <div  className="m-5 text-xl font-bold font-serif text-cyan-500">Sort by Expertise:</div>
             <div>
             <SortDropDown  expertise={expertise} setExpertise={setExpertise}/>
           </div>
           <div  className="m-5 text-xl font-bold font-serif text-cyan-500">Sort by Experience</div> 
           <div>
                <QuantityInput experience={experience} setExperience={setExperience}/>
            </div></div>
            <h1 className='text-4xl font-serif font-semibold mb-4 text-cyan-500 mb-6'>Available Dentist</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <DentistCatalog dentistsJson={dentistJson} date={bookingDate} expertise={expertise} experience={experience}/>
            </Suspense>
      
        </div>
    )
}
