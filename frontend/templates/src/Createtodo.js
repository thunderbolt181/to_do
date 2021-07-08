import axios from "axios";
import { useState } from "react";
import {getCookie} from "./csrfToken";

const Createtodo = () => {

    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        const todolist = {title, task}
        axios.post('api/todoviews/',JSON.stringify(todolist),{
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
                    <h3 className="card-title m-auto">Create a new TO-DO List</h3>
                </div>
                <div className="card-body">
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label >Title</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Task</label>
                        <textarea required value={task} onChange={(e) => setTask(e.target.value)} ></textarea>
                        <button className="btn btn-primary">Create Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Createtodo;