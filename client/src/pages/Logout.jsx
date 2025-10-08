  import { useEffect } from "react";
  import { Navigate } from "react-router-dom";
  import {useAuth} from"../store/auth";

  export const Logout =()=>{
    const {LogoutCustomer} = useAuth();
    useEffect(()=>
    {
      LogoutCustomer();
    },[LogoutCustomer]
    ); 
    return <Navigate to ="/login" />;
  };
  export default Logout;