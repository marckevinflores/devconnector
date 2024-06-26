import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Container from './components/layout/Container';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return ( 
  <Provider store={store}>
  <Router>
    <Fragment>
    <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Container>
          <Alert/>
            <Switch>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </Container>
  </Fragment>
  </Router>
  </Provider>
)}

export default App;
