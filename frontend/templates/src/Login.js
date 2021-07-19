import { useState } from "react";
// import { useHistory } from "react-router-dom";
import PostRequest from "./request/postrequest";

const Login = () => {
    // const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);

    const handlePost = async (values) => {
        const {data,error} = await PostRequest('/login',values);
        if (data != null){
            setLoading(false);
            console.log(data);
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