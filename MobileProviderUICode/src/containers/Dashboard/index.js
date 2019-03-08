/*
* File: index.js
* A container component, which is for the admin. A simple login screen and if already logged in the 
* admin dashboard, where one can manage the prefixes and rate is shown.  
*/

import React, { Component } from 'react';
import AuthLayout from '../../layout/Auth';

class DashboardContainer extends Component {
    render() {
        return (
            <AuthLayout />
        )
    }
}

export default DashboardContainer;