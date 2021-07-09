import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {getCookie} from "./csrfToken";
import GetRequest from "./getrequest";

const EditToDo = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState("");
    const [completed, setCompleted] = useState(null);
    const url = 'http://localhost:8000/api/todoviews/'+id

    const  {data:todolist, ispending,error} = GetRequest(url);

    useEffect(() => {
        if(!ispending){
            setTasks(todolist.tasks);
            setTitle(todolist.title);
            setCompleted(todolist.completed);
        }
    }, [ispending,todolist])

    const handleValue = () => {
        let value = {};
        if (todolist.title !== title){
            value['title']=[title];
        }
        if (todolist.task !== tasks){
            value['tasks'] = [tasks];
        }
        if (todolist.completed !== completed){
            value['completed'] = [completed];
        }
        return value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const todolist = handleValue();
        console.log(todolist)
        axios.patch(`${url}/`,JSON.stringify(todolist),{
            headers:{
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            })
            .then(res => {
                console.log(res.data)
            }
        )
    }

    return (
        <div className="create">
            <div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h3 className="card-title m-auto">Edit</h3>
                </div>
                <div className="card-body">
                {error && <div>{error}</div>}
                {ispending && <div>Loading...</div>}
                <form className="d-flex flex-column" >
                    <div className="d-flex flex-row justify-content-between">
                        <label className="my-auto" >Title</label>
                    </div>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label>Task</label>
                    <textarea required value={tasks} onChange={(e) => setTasks(e.target.value)} ></textarea>
                    <button className="btn btn-primary" onClick={handleSubmit}>Edit Task</button>
                </form>
                </div>
            </div>
        </div>
    );
}
 
export default EditToDo;