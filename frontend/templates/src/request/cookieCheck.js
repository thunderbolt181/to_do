import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

const CookieCheck = () => {
    const [ans,setAns] = useState(null);

    useEffect(() => {
        var cookie = new Cookies();
        if (cookie.get("to_do_auth_token")===undefined){
            setAns(true)
        }else{
            setAns(false)
        }
    },[ans])
    return ans
}
 
export default CookieCheck;