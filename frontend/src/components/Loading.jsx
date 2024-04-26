import { Spinner } from "react-bootstrap";

export default function Loading(){
    return (
        <Spinner
            animation="border"
            role="status"
            style={{width:'100px', height:'100px', margin:'auto',display:'block',marginTop:'10rem'}}
        ></Spinner>
    )
}