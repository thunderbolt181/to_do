import { getCookie } from "../csrfToken";
import axios from "axios";
import Cookies from 'universal-cookie';

const PostRequest = (url,values) => {
    async function createPost(url,values) {
      var data = null;
      var error = null;
      const cookie = new Cookies()
      await axios.patch(url,JSON.stringify(values),{
          headers:{
                  'Content-Type': 'application/json',
                  "X-CSRFToken": getCookie('csrftoken'),
                  'Authorization':`Token ${cookie.get("to_do_auth_token")}`,
              }
          })
        .then((res) => {
          data = res.data
        })
        .catch((err) => {
          error= err.message
        })
        return {data,error}
      }
    return createPost(url,values)
}

export default PostRequest;