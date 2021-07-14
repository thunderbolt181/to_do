import Navbar from './Navbar';
import ToDoList from './todolist';
import Createtodo from './Createtodo';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditToDo from './EditTodo';
// import Login from './login';

function App() {
  return (
    <Router>
      <div className="main vh-100">
        <Navbar/>
        <div className="main vh-100">
          <Switch>
            <Route exact path="/">
              <ToDoList/>
            </Route>
            <Route exact path="/create">
              <Createtodo/>
            </Route>
            <Route exact path="/edit/:id">
              <EditToDo/>
            </Route>
            {/* <Route exact path="/login">
              <Login/>
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
