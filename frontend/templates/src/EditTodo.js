import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {getCookie} from "./csrfToken";
import GetRequest from "./getrequest";

const EditToDo = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(null);
    const [loading,setLoading] = useState(false);

    const {data:todolist, ispending,error} = GetRequest(`/api/todoviews/${id}`);

    useEffect(() => {
        if(todolist != null){
            setTitle(todolist.title);
            setTask(todolist.tasks);
            setCompleted(todolist.completed);
        }
    }, [todolist])

    const handleValue = () => {
        let value = {};
        if (todolist.title !== title){
            value['title']=title;
        }
        if (todolist.task !== task){
            value['tasks'] = task;
        }
        if (todolist.completed !== completed){
            value['completed'] = completed;
        }
        return value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        const todolist = handleValue();
        axios.patch(`/api/todoviews/${id}/`,JSON.stringify(todolist),{
            headers:{
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
            .then(res => {
                setLoading(false);
                console.log(res.data)
            }
        )
    }

    return (
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h1 className="card-title m-auto">Edit</h1>
                </div>
                <div className="card-body">
                {error && <div>{error}</div>}
                {ispending && <div>Loading...</div>}
                <form className="d-flex flex-column" >
                    <div className="d-flex flex-row justify-content-between mx-2">
                        <h2 >Title</h2>
                        <div className="my-auto mx-2">
                            Completed :  {completed && <i className="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>}
                            {!completed && <i className="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>}
                        </div>
                    </div>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <h2>Task</h2>
                    <textarea required value={task} onChange={(e) => setTask(e.target.value)} ></textarea>
                    {!loading && <button className="btn btn-primary" onClick={handleSubmit}>Save</button>}
                    {loading && <div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>}
                </form>
                </div>
            </div>
        </div>
    );
}
 
export default EditToDo;