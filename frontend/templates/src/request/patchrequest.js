import { getCookie } from "../csrfToken";
import axios from "axios";

const PostRequest = (url,values) => {
    async function createPatch(url,values) {
      var data = null;
      var error = null;
      await axios.patch(url,JSON.stringify(values),{
          headers:{
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie('csrftoken'),
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
    return createPatch(url,values)
}

export default PostRequest;