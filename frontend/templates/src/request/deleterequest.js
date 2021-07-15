import { getCookie } from "../csrfToken";
import axios from "axios";

const DeleteRequest = (url) => {
    async function createPost(url) {
      var data = null;
      var error = null;
      await axios.delete(url,{
            headers:{
                "X-CSRFToken": getCookie('csrftoken')
            } 
        })
        .then(res => {
            data = res.data
            // if (res.data.valid){
            //     history.push('/')
            // }
        }).catch(err => {
            // setErrors(err.message);
            error= err.message
        })
        return {data,error}
      }
    return createPost(url)
}

export default DeleteRequest;