import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(){
    const {userInfo} = useSelector(state=> state.auth);
    return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
}