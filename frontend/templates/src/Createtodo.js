import { useState } from "react";
import { useHistory } from "react-router-dom";
import PostRequest from "./request/postrequest";

const Createtodo = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);

     const handlePost = async (values) => {
        const {data,error} = await PostRequest('api/todoviews/',values);
        if (data != null){
            setLoading(false);
            history.push(`/edit/${data.id}`)
        }
        if (error != null){
            setErrors(error);
            setLoading(false);
            if (error[1] === 403){
                history.push("/login")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = {title, tasks}
        setLoading(true);
        handlePost(values);
    }

    return (
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header rounded d-flex'}>
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
                        (<button className="link mx-auto" >Save</button>)}
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Createtodo;