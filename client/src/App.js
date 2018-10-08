import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch  } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';



import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import jwt_decode from 'jwt-decode';
import {logoutuser} from './actions/authAction'
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/not-found/NotFound';

import './App.css';

if(localStorage.jwtToken){
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //decode the token  
  const decoded =jwt_decode(localStorage.jwtToken);
  //dispatch the user
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutuser());
    // TODO: Clear current Profile
    
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
