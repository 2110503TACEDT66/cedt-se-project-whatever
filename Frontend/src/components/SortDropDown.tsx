import {Select,MenuItem} from "@mui/material"

export default function SortDropDown({expertise,setExpertise}:{expertise:string,setExpertise:Function}){

    return(
        <Select 
        variant="standard" 
        name="expertise" 
        id="expertise" 
        value={expertise} 
        className="h-[40px] w-[200px] bg-white rounded-lg " 
        onChange={(e)=>(setExpertise(e.target.value))}
        >
                <MenuItem value="">None</MenuItem> 
                <MenuItem value="Orthodontics">Orthodontics (จัดฟัน)</MenuItem>
                <MenuItem value="Prosthetic Dentistry">Prosthetic Dentistry (ทันตกรรมประดิษฐ์)</MenuItem>
                <MenuItem value="Dental occlusion">Dental occlusion (ทันตกรรมบดเคี้ยว)</MenuItem>
                <MenuItem value="Oral and maxillofacial surgery">Oral and maxillofacial surgery (ศัลยกรรมช่องปากและใบหน้าขากรรไกร)</MenuItem>
                <MenuItem value="Endodontics">Endodontics (การรักษารากฟัน)</MenuItem>
                <MenuItem value="Pediatric Dentistry">Pediatric Dentistry (ทันตกรรมสำหรับเด็ก)</MenuItem>
                <MenuItem value="Operative Dentistry">Operative Dentistry (อุดฟัน)</MenuItem>
                <MenuItem value="Periodontics">Periodontics (ทันตกรรมโรคเหงือก)</MenuItem>
            </Select>
    )
}