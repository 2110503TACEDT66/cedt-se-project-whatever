'use client'
import Link from "next/link";
import Card from "./Card";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";


export default function DentistCatalog({dentistsJson,date}:{dentistsJson:DentistJson,date:string}){
    const dentistJsonReady = dentistsJson;
    const [expertise,setExpertise] = useState<string>("");
    const [experience,setExperience] = useState<number>(0);
    return(
        <div>
        <div className= 'container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                date!=""?
                dentistJsonReady.data.map((dentistItem:DentistItem)=>(
                    
                    dentistItem.bookings?.some((bookdate:BookingItem)=>{
                        let dd = bookdate.bookingDate ;
                        console.log(date+"\n"+dd);
                        return new Date(date).toISOString()==dd.toString();
                    })
                    ?
                    null
                    :
                    (dentistItem.expertise == expertise || expertise == "") && (dentistItem.experience >= experience || experience == 0)?
                    <Link href={`/dentists/${dentistItem.id}`} >
                        <Card dentistName={dentistItem.name} imgSrc={dentistItem.picture}/>
                    </Link>
                    :null
                ))
                :null
            }
          </div>
        </div>
    )
}