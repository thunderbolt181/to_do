import { useEffect, useState } from "react";
import axios from 'axios';

const GetRequest = (url) => {

    const [data, setData] = useState(null);
    const [ispending, setIsPending] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data);
                setIsPending(false);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            })
        },[url]);

    return {data,ispending,error};
}
 
export default GetRequest;