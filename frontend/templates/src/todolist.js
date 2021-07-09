import GetRequest from "./getrequest";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const ToDoList = () => {
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    
    const {data:todolist, ispending, error} = GetRequest('api/todoviews');
    const [counting, setCounting] = useState(false);

    useEffect(() => {
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
    },[todolist]);
    
    return ( 
        <div className="to-do">
            <div className="card mb-2" >
                <div className={'card-header border rounded d-flex flex-row justify-content-between'}>
                    {counting && <h3 className="card-title my-auto">{counting}</h3>}
                    <Link to="/create" className="btn btn-primary" >Create New</Link>
                </div>
            </div>
            {error && <div>{error}</div>}
            {ispending && <div>Loading..</div>}
            {todolist && <div>{todolist.map((item) => (
                <div className="card mb-5" key={item.id}>
                    <div className={'card-header border rounded d-flex flex-row justify-content-between'}>
                        <h3 className="card-title my-auto">{item.title}</h3>
                        <Link to={`/edit/${item.id}`} className="btn btn-primary" >Edit</Link>
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
        </div>
     );
}
 
export default ToDoList;

