import { useState } from "react";
import PostRequest from "./request/postrequest";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";


const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);

    const handlePost = async (values) => {
        const {data,error} = await PostRequest('/login',values);
        if (data != null){
            const options =  { 
                path: '/',
                secure:true,
                sameSite:true,
            };
            const cookies = new Cookies();
            cookies.set('to_do_auth_token', data.token ,options);
            console.log(cookies.get('to_do_auth_token'))
            history.push(``);
        }
        if (error != null){
            setLoading(false);
            setErrors(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {username, password}
        setLoading(true);
        handlePost(values);
    }

    return ( 
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h3 className="card-title m-auto">Login</h3>
                </div>
                <div className="card-body">
                    {errors && <div className="alert alert-danger" role="alert">{errors}</div>}
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label >Username</label>
                        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {loading ? (<div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>):
                        (<button className="btn btn-primary" >Sign In</button>)}
                    </form>
                </div>
            </div>
        </div>
   );
}
 
export default Login;