import {Select,MenuItem} from "@mui/material"

export default function SortDropDown({expertise,setExpertise}:{expertise:string,setExpertise:Function}){

    return(
        <Select variant="standard" name="expertise" id="expertise" value={expertise} className="h-[2em] w-[200px] bg-slate-100 rounded-lg py-2 px-2" onChange={(e)=>(setExpertise(e.target.value))}> 
                <MenuItem value="Orthodontics">Orthodontics</MenuItem>
                <MenuItem value="Prosthetic Dentistry">Prosthetic Dentistry</MenuItem>
                <MenuItem value="Dental occultion">Dental occultion</MenuItem>
                <MenuItem value="Oral and maxillofacial surgery">Oral and maxillofacial surgery</MenuItem>
                <MenuItem value="Endodontics">Endodontics</MenuItem>
                <MenuItem value="Pediatric Dentistry">Pediatric Dentistry</MenuItem>
                <MenuItem value="Operative Dentistry">Operative Dentistry</MenuItem>
                <MenuItem value="Periodontics">Periodontics</MenuItem>
            </Select>
    )
}