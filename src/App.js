import './App.css';
import $ from 'jquery';
import { createContext, useState ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Contact from './components/Contact/Contact';
import Blog from './components/Blog/Blog';

export const UserContext = createContext()
function App() {
  
  const [loggedInUser,setLoggedInUser]=useState({
    name:"",
    email:"",
  })


  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>
      <Switch>
        <Route path="/home">
          <Home></Home>

        </Route>

        <Route exact path="/">
          <Home></Home>

        </Route>

        <Route  path="/blog">
          <Blog></Blog>

        </Route>
        <Route  path="/login">
          <Login></Login>
        </Route>

        <PrivateRoute  path="/destination/:id">
          <Destination></Destination>
        </PrivateRoute>

          
         
        <PrivateRoute path="/contact">
          <Contact></Contact>
        </PrivateRoute>

        <Route  path="*">
          <NotFound></NotFound>

        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
