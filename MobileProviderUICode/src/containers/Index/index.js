
/*
* File: index.js
* A container component, which is displayed when the site is launched. ie http://localhost:4000/ 
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {  } from '../../actions/Actions';
import CommonLayout from '../../layout/CommonLayout';
import PrefixInput from '../../components/index/PrefixInput';

const styles = theme => ({
    errorMessage: {
        fontSize: '.9em',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    backHome: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2%'
    }
})

class IndexContainer extends Component {
    render() {
    
        return (
            <CommonLayout>
                   <PrefixInput />
            </CommonLayout>
        )
    }
}

const MapStateToProps = (state) => {
    return state;
}

const MapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(IndexContainer));