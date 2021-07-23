import Navbar from './Navbar';
import ToDoList from './todolist';
import Createtodo from './Createtodo';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditToDo from './EditTodo';
import Login from './Login';
import Register from './register';

function App() {
  return (
    <Router>
        <div className="main vh-100">
            <Switch>
              <Route exact path="/">
                <Navbar path={"/"}/>
                <ToDoList/>
              </Route>
              <Route exact path="/create">
                <Navbar path={"/"}/>
                <Createtodo/>
              </Route>
              <Route exact path="/edit/:id">
                <Navbar path={"/"}/>
                <EditToDo/>
              </Route>
              <Route exact path="/login">
                <Navbar path={"/login"}/>
                <Login/>
              </Route>
              <Route exact path="/register">
                <Navbar path={"/register"}/>
                <Register/>
              </Route>
            </Switch>
          </div>
    </Router>
  );
}

export default App;
