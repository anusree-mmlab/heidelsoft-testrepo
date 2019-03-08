/*
* File: Operator.js
* Component to display the Operator details, Create Screen, Delete Screen
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DataTable from './Table';
import CreateForm from './CreateForm';
import { connect } from 'react-redux';
import {getOperatorList} from '../../actions/Actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Operators extends Component {
    componentWillMount() {
        this.props.loadOperatorList();
    }
    render() {
        const { classes } = this.props;
        const OperatorData = this.props.OperatorData;

        return (
            <Grid container spacing={24} className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <CreateForm />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                   
                    <DataTable data={OperatorData} authInfo={this.props.auth} />
                </Grid>
            </Grid>
        )
    }
}

Operators.propTypes = {
    classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
    return state;
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadOperatorList: () => dispatch(getOperatorList())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(Operators));
