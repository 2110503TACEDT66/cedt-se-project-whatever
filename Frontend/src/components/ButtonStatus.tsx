import CircleIcon from '@mui/icons-material/Circle';

export default function ButtonStatus({ status }: { status: string }) {
    if(status === 'pending'){
        return <span className='ml-1 mb-1'><CircleIcon style={{fill: "orange",fontSize:"10"}}/></span>
    }
    else return <span className='ml-1 mb-1'><CircleIcon style={{fill: "green",fontSize:"10"}}/></span>
}