import GetRequest from "./getrequest";

const ToDoList = () => {
    let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  
    
    const {data:todolist, ispending, error} = GetRequest('api/todoviews');

    return ( 
        <div className="to-do">
            {error && <div>{error}</div>}
            {ispending && <div>Loading..</div>}
            {todolist && <div>{todolist.map((item) => (
                <div className="card mb-5" key={item.id}>
                    <div className={'card-header border rounded d-flex flex-row justify-content-between'}>
                        <h3 className="card-title my-auto">{item.title}</h3>
                        <a href="/" className="btn btn-primary" >Edit</a>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{item.tasks}</p>
                        <p className="mb-0 text-end text-secondary">{new Date(item.created_at).toLocaleTimeString("en-us", options)}</p>
                    </div>
                </div>
            ))}</div>}
        </div>
     );
}
 
export default ToDoList;

