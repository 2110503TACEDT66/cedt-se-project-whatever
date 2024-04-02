'use client'
import Link from "next/link";
import Card from "./Card";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";


export default function DentistCatalog({dentistsJson,date}:{dentistsJson:DentistJson,date:string}){
    const dentistJsonReady = dentistsJson;
    return(
        <div>
        <div className= 'flex flex-row p-10 flex-wrap justify-center items-center'>
            {
                date!=""?
                dentistJsonReady.data.map((dentistItem:DentistItem)=>(
                    <div className="w-1/5 m-12">
                    { dentistItem.bookings?.some((bookdate:BookingItem)=>{let dd = bookdate.bookingDate ;console.log(date+"\n"+dd);return new Date(date).toISOString()==dd.toString();})?
                    null
                    :
                    <Link href={`/dentists/${dentistItem.id}`} >
                        <Card dentistName={dentistItem.name} imgSrc={dentistItem.picture}/>
                    </Link>
                    }
                    </div>
                )):null
            }
          </div>
        </div>
    )
}