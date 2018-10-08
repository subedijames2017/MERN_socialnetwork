import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect}  from 'react-redux';
import { logoutuser } from '../../actions/authAction'
import PropTypes from 'prop-types';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {
  handelLogout =(e)=>{
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutuser();
    //console.log("this is working");
    
  }
  render() {
    const { isAuthenticated , user } = this.props.auth;
    const auuthLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
               <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              <li className="nav-item">
              <a href='' className="nav-link" onClick={this.handelLogout.bind(this)}>
              <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
              logout
              </a>
              </li>
          </ul>
    ); 
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? auuthLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTyper={
  logoutuser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth
})
export default connect(mapStateToProps,{ logoutuser,clearCurrentProfile })(Navbar);
