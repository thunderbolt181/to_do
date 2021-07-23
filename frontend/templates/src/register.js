import { useState } from "react";
import PostRequest from "./request/postrequest";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";


const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);

    const handlePost = async (values) => {
        const {data,error} = await PostRequest('/api/register/',values);
        if (data != null){
            var options =  { 
                path: '/',
                sameSite:true,
            };
            const cookies = new Cookies();
            cookies.set('to_do_auth_token', data.token ,options);
            history.push('/');
        }
        if (error != null){
            setLoading(false);
            setErrors(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {username,email, password ,password2,first_name,last_name}
        setLoading(true);
        handlePost(values);
    }

    return ( 
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h3 className="card-title m-auto">Register</h3>
                </div>
                <div className="card-body">
                    {errors && <div className="alert alert-danger" role="alert">{errors}</div>}
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label >First Name</label>
                        <input type="text" required value={first_name} onChange={(e) => setFirst_name(e.target.value)}/>
                        <label >Last Name</label>
                        <input type="text" required value={last_name} onChange={(e) => setLast_name(e.target.value)}/>
                        <label >Username</label>
                        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label >Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Repeat Password</label>
                        <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        {loading ? (<div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>):
                        (<button className="btn btn-primary" >Register</button>)}
                    </form>
                </div>
            </div>
        </div>
   );
}
 
export default Register;