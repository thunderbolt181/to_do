import Navbar from './Navbar';
import ToDoList from './todolist';
import Createtodo from './Createtodo';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
