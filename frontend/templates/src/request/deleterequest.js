import { getCookie } from "../csrfToken";
import axios from "axios";
import Cookies from 'universal-cookie';

const DeleteRequest = (url) => {
    async function createPost(url) {
      var data = null;
      var error = null;
      const cookie = new Cookies()
      await axios.delete(url,{
            headers:{
                "X-CSRFToken": getCookie('csrftoken'),
                'Authorization':`Token ${cookie.get("to_do_auth_token")}`,
            } 
        })
        .then(res => {
            data = res.data
        }).catch(err => {
            error= err.message
        })
        return {data,error}
      }
    return createPost(url)
}

export default DeleteRequest;