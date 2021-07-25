import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import GetRequest from "./request/getrequest";
import { useHistory } from "react-router-dom";
import PatchRequest from "./request/patchrequest";
import DeleteRequest from "./request/deleterequest";

const EditToDo = () => {
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    const {id} = useParams();
    const history = useHistory();
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
            if (error[1] === 403){
                history.push("/login")
            }
        }
    }, [todolist,error,history])

    const handleSuccess = (success) => {
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

    const handlePatch = async (values) => {
        const {data,error} = await PatchRequest(`/api/todoviews/${id}/`,values);
        if (data != null){
            setLoading(false);
            todolist.title = title;
            todolist.tasks = task;
            todolist.completed = completed;
            var msg = handleSuccess(data.valid)
            values = {};
            document.getElementById('submitalert').innerHTML=msg
        }
        if (error != null){
            setLoading(false);
            setErrors(error);
            if (error[1] === 403){
                history.push("/login")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var values = handleValue();
        if(Object.keys(values).length > 0){
            setLoading(true);
            handlePatch(values);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const {data,error} = await DeleteRequest(`/api/todoviews/${id}/`)
        if (data != null){
            if (data.valid){
                history.push('/')
            }
        }
        if (error != null){
            setErrors(error);
        }
    }

    return (
        <div className="create">
            {!loader ? (<div className="justify-content-center d-flex"><div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div></div>):
            (<div className="card mb-5">
                <div className={'card-header border rounded d-flex flex-row justify-content-between'}>
                    <h1 className="card-title my-auto">Edit</h1>
                    <div className="my-auto mx-4" onClick={handleDelete} >
                        <i className="fa fa-trash" style={{color:'red',fontSize:'24px'}} aria-hidden="true" ></i>
                    </div>
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