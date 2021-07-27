import GetRequest from "./request/getrequest";
import { useEffect,useState } from "react";
import { Link, useHistory } from "react-router-dom";

const ToDoList = () => {
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    const history = useHistory();
    const {data:todolist, ispending, error} = GetRequest('api/todoviews');
    const [counting, setCounting] = useState(false);
    const [loader,setLoader] = useState(false);

    useEffect(() => {
        if (error == null){
            var t =0;
            var f = 0;
            if (todolist!=null){
                for(var i=0;i< Object.keys(todolist).length;i++){
                    if (todolist[i.toString()]['completed']){
                        t+=1;
                    }else{
                        f+=1;
                    }
                }
            }
            setCounting(`Completed:${t} Pending:${f}`);
            setLoader(true);
        }
        if (error != null){
            setLoader(true);
            if (error[1] === 403){
                history.push("/login")
            }
        }
    },[todolist,error,history]);
    
    return ( 
        <div className="to-do">
            {!loader ? (<div className="justify-content-center d-flex"><div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div></div>):
            (<div>
                <div className="card mb-3" >
                <div className={'card-header d-flex flex-row justify-content-between'}>
                    {counting && <h3 className="card-title my-auto">{counting}</h3>}
                    <Link to="/create" className="link " >Create New</Link>
                </div>
            </div>
            {error && <div className="alert alert-danger bg-color-primary" role="alert">{error}</div>}
            {ispending && <div>Loading..</div>}
            {todolist && <div>{todolist.map((item) => (
                <div className="card mb-2" key={item.id}>
                    <div className={'heading d-flex flex-row justify-content-between'}>
                        <h3 className="card-title my-auto">{item.title}</h3>
                        <Link to={`/edit/${item.id}`} className="link " >Edit</Link>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{item.tasks}</p>
                        <div className="d-flex f-row justify-content-between">
                            <div className="my-auto mx-2">
                                Completed :  {item.completed && <i className="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>}
                                {!item.completed && <i className="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>}
                            </div>
                            <p className="mb-0 text-end text-secondary">{new Date(item.created_at).toLocaleTimeString("en-us", options)}</p>
                        </div>
                    </div>
                </div>
            ))}</div>}    
            </div>)}
        </div>
     );
}
 
export default ToDoList;

