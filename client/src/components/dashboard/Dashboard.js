import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../../actions/profileAction';
import { clearCurrentProfile } from '../../actions/profileAction'
import Spinner from '../common/Spinner';
import {Link  } from 'react-router-dom'
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount=()=>{
    this.props.getCurrentProfile();
    this.props.clearCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div>
        {dashboardContent}
      </div>
    )
  }
}
Dashboard.propTypes ={
  auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth,
  profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile ,clearCurrentProfile, deleteAccount})(Dashboard);