import { useState } from "react";
import { useHistory } from "react-router-dom";
import PatchRequest from "./request/patchrequest";
import logo from './logo192.png';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const handlePatch = async () => {
        const cookie = new Cookies()
        const {data,error} = await PatchRequest('/api/logout/',null);
        if (data != null){
            setLoading(false);
            cookie.remove("to_do_auth_token")
            history.push(`/login`)
        }
        if (error != null){
            setLoading(false);
        }
    }

    return ( 
        <div className="navbar d-flex felx-row">
            <div className="logo d-inline-flex bd-highlight">
                <img className="logo-img m-auto p-2" src={logo} alt="Logo" />
                <h1 className="m-auto p-2">TO-DO</h1>
            </div>
            <div className="p-1">
                <Link className="link" to="/">Home</Link>
                {loading ? (<div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>):
                        (<button className="link" onClick={handlePatch} >Logout</button>)}
            </div>
        </div>
     );
}

export default Navbar;