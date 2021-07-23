import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

const GetRequest = (url) => {

    const [data, setData] = useState(null);
    const [ispending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cookie = new Cookies()
        axios.get(url,{
                headers:{
                    'Authorization':`Token ${cookie.get("to_do_auth_token")}`,
                }
            })
            .then(res => {
                setData(res.data);
                setIsPending(false);
            })
            .catch((err) => {
                setIsPending(false);
                setError([err.response.message,err.response.status]);
            })
        },[url]);

    return {data,ispending,error};
}
 
export default GetRequest;