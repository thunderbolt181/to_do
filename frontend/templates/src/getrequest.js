import { useEffect, useState } from "react";
import axios from 'axios';

const GetRequest = (url) => {

    const [data, setData] = useState(null);
    const [ispending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data);
                setIsPending(false);
            })
            .catch((err) => {
                setIsPending(false);
                if (err.response.status === 500){
                    setError("Cannot Connect to the server!");
                }else{
                    setError(err.message);
                }
            })
        },[url]);

    return {data,ispending,error};
}
 
export default GetRequest;