/*
* File: Auth.js
* Auth layout validates the login status. If the used is not logged in the login screen is shown otherwise the admin dashboard
*/

import React, {Component} from 'react';
import _ from 'lodash';
import DashboardLayout from './DashboardLayout';
import LoginLayout from './LoginLayout';
import { connect } from 'react-redux';

const authCheck = () => {
    // Get the auth object
    const auth = localStorage.getItem("admin-auth");
    if (!_.isNil(auth)) {
      return (<DashboardLayout />)
    } else {
      return (<LoginLayout/>)
    }
  }

class AuthLayout extends Component {
      render() {
          return (authCheck())
      }
}

const MapStateToProps = (state) => {
    return state;
  }

export default connect(MapStateToProps) (AuthLayout);