import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {getCookie} from "./csrfToken";
import GetRequest from "./getrequest";

const EditToDo = () => {
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(null);
    const [loading,setLoading] = useState(false);
    const [loader,setLoader] = useState(false);
    const [created,setCreated] = useState(null);

    const {data:todolist, ispending,error} = GetRequest(`/api/todoviews/${id}`);
    const [errors,setErrors] = useState(error);

    useEffect(() => {
        if (error == null){
            if(todolist != null){
                setTitle(todolist.title);
                setTask(todolist.tasks);
                setCompleted(todolist.completed);
                setCreated(todolist.created_at);
                setLoader(true);
            }
        }
        if(error!=null){
            setLoader(true);
        }
    }, [todolist,error])

    const handleSuccess = (success) => {
        console.log(success)
        if (success){
            return `<div class="alert alert-success bg-color-primary" role="alert">Changes have been made Successfully</div>`
        }else{
            return `<div class="alert alert-danger" role="alert">Looks like you entered something wrong</div>`
        }
    }

    const handleCompleted = () => {
        if (completed){
            setCompleted(false);
        }else{
            setCompleted(true);
        }
    }

    const handleValue = () => {
        let value = {};
        if (todolist.title !== title){
            value['title']=title;
        }
        if (todolist.tasks !== task){
            value['tasks'] = task;
        }
        if (todolist.completed !== completed){
            value['completed'] = completed;
        }
        return value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var values = handleValue();
        if(Object.keys(values).length > 0){
            setLoading(true);
            axios.patch(`/api/todoviews/${id}/`,JSON.stringify(values),{
                headers:{
                        'Content-Type': 'application/json',
                        "X-CSRFToken": getCookie('csrftoken')
                    }
                })
                .then(res => {
                    setLoading(false);
                    todolist.title = title;
                    todolist.tasks = task;
                    todolist.completed = completed;
                    var msg = handleSuccess(res.data.valid)
                    values = {};
                    document.getElementById('submitalert').innerHTML=msg
                }).catch((err) => {
                    setLoading(false);
                    setErrors(err.message);
                })
        }
    }

    return (
        <div className="create">
            {!loader ? (<div className="justify-content-center d-flex"><div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div></div>):
            (<div className="card mb-5">
                <div className={'card-header border rounded d-flex'}>
                    <h1 className="card-title m-auto">Edit</h1>
                </div>
                <div className="card-body">
                    {errors && <div className="alert alert-danger" role="alert">{errors}</div>}
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {ispending && <div>Loading...</div>}
                    <form className="d-flex flex-column" >
                        <div id="submitalert"></div>
                        <div className="d-flex flex-row justify-content-between mx-2">
                            <h2 >Title</h2>
                            <div className="my-auto mx-2">
                                {completed ? (<div onClick={handleCompleted}>Completed : <i className="fa fa-check" style={{color:'green'}} aria-hidden="true"></i></div>):
                                (<div onClick={handleCompleted}>Completed : <i className="fa fa-times" style={{color:'red'}} aria-hidden="true"></i></div>)}
                            </div>
                        </div>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <h2>Task</h2>
                        <textarea required value={task} onChange={(e) => setTask(e.target.value)} ></textarea>
                        <p className="mb-0 text-end text-secondary">{new Date(created).toLocaleTimeString("en-us", options)}</p>
                        {loading ? (<div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>):
                            (<button className="btn btn-primary" onClick={handleSubmit}>Save</button>)}
                    </form>
                </div>
            </div>)}
        </div>
    );
}
 
export default EditToDo;