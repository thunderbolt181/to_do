import { Link, useHistory } from "react-router-dom";
import PatchRequest from "./request/patchrequest";
import logo from './logo192.png';
// import Cookies from 'universal-cookie';

const Navbar = ({path}) => {
    const history = useHistory();
    const handlePatch = async () => {
        // const cookie = new Cookies()
        const {data,error} = await PatchRequest('/api/logout/',null);
        if (data != null){
            history.push(`/login`);
        }
        if (error != null){
            console.log(error);
        }
    }

    return ( 
        <div className="navbar d-flex felx-row">
            <div className="logo d-inline-flex bd-highlight">
                <img className="logo-img m-auto p-2" src={logo} alt="Logo" />
                <h1 className="m-auto p-2">TO-DO</h1>
            </div>
            <div className="p-1 d-flex flex-row">
                {path==="/"?(
                        <div>
                            <Link className="link" to="/">Home</Link>
                            <button className="link py-2" onClick={handlePatch}>Logout</button>
                        </div>):
                    null}
                {path==="/login"?<Link className="link" to="/register">Register</Link>:null}
                {path==="/register"?<Link className="link" to="/login">Login</Link>:null}
            </div>
        </div>
     );
}
 
export default Navbar;