import React from 'react';
import './App.css';
import Menu from './components/MenuComponent'
import RegisterForm from './components/RegisteFormComponent/RegisterForm'
import LoginForm from './components/LoginFormComponent'
import Home from './components/HomeComponent'
import NotFoundPage from './components/NotFoundComponent'

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Menu></Menu>
        <Switch>
            <Route exact path={["/","/home"]} component={Home}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path='/404' component={NotFoundPage} />
            <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

