import axios from "axios";
import { useState } from "react";
import {getCookie} from "./csrfToken";
import { useHistory } from "react-router-dom";

const Createtodo = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {title, tasks}
        if(Object.keys(values).length > 0){
            setLoading(true);
            axios.post('api/todoviews/',JSON.stringify(values),{
                headers:{
                        'Content-Type': 'application/json',
                        "X-CSRFToken": getCookie('csrftoken')
                    }
                })
                .then(res => {
                    setLoading(false)
                    if (res.data.valid){
                        history.push(`/edit/${res.data.id}`)
                    }
                }).catch((err) => {
                    setLoading(false);
                    setErrors(err.message);
                })
        }
    }

    return (
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h3 className="card-title m-auto">Create a new TO-DO List</h3>
                </div>
                <div className="card-body">
                    {errors && <div className="alert alert-danger" role="alert">{errors}</div>}
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label >Title</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Task</label>
                        <textarea required value={tasks} onChange={(e) => setTasks(e.target.value)} ></textarea>
                        {loading ? (<div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>):
                        (<button className="btn btn-primary" >Save</button>)}
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Createtodo;