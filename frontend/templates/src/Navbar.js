import logo from './logo192.png'

const Navbar = () => {
    return ( 
        <div className="navbar d-flex felx-row">
            <div className="logo d-inline-flex bd-highlight">
                <img className="logo-img m-auto p-2" src={logo} alt="Logo" />
                <h1 className="m-auto p-2">TO-DO</h1>
            </div>
            <div className="p-1">
                <button>Create New</button>
            </div>
            
        </div>
     );
}
 
export default Navbar;