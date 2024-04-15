import { Unstable_NumberInput as NumberInput, NumberInputProps,
  numberInputClasses, } from '@mui/base/Unstable_NumberInput';


export default function SortDropDown({experience,setExperience}:{experience:number,setExperience:Function}){

    
  
    return(
        <NumberInput aria-label="Demo number input" placeholder="Type a number…" className="text-black" value={experience} onChange={(e) => (console.log({experience}))}/>
    )

   
}