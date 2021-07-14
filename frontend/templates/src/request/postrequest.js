import { useState,useEffect } from "react";
import { getCookie } from "../csrfToken";
import axios from "axios";

const PostRequest = (url,values) => {
    function createPost() {
      var data = null;
      var error = null;
        axios.post(url,JSON.stringify(values),{
            headers:{
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
          .then((res) => {
            data = res.data
          })
          .catch((err) => {
            error = err.message
          })
        return {data,error}
      }
    return createPost(url,values)
    // return axios.post(url,JSON.stringify(values),{
    //         headers:{
    //                 'Content-Type': 'application/json',
    //                 "X-CSRFToken": getCookie('csrftoken')
    //             }
    //         })
    //         .then(res => {
    //             data = res.data;
    //         })
    //         .catch((err) => {
    //             error = err.message
    //         })
}
 
export default PostRequest;