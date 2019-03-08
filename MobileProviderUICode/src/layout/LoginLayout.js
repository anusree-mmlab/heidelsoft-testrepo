/*
* File: LoginLayout.js
* The layout is applied when the user is not logged in while accessing the /admin url.
* A simple login with email is added.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { onUserLoginLogout } from '../actions/Actions';


const styles = {
    container: {
        padding: '10%'
    },
    card: {
        maxWidth: 345,
        margin: 'auto',
        width: '50%',
        padding: '20px',

    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        //objectFit: 'cover',
        //backgroundColor: '#008394'
    },
    textField: {
        backgroundColor: '#fff',
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1%'
    }
};

class LoginLayout extends Component {
    state = {
        email: '',
        emailError: ''
    }

    onEmailChange(val) {
        this.setState({ email: val });

        if(this.validateEmail(val)) {
            this.setState({ emailError: '' });
        } else {
            this.setState({ emailError: 'Please enter valid email' });
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    userLogin() {
        if(this.validateEmail(this.state.email)) {
            //Proceed to dashboard
            const authObj = {email: this.state.email};
            localStorage.setItem("admin-auth", JSON.stringify(authObj));
            //Logging in the user
            this.props.userLogin(true);
            this.setState({ emailError: '' });
            window.location.reload();
        } else {
            //Display error message
            this.setState({ emailError: '*Please enter email' });
        }
    }

    componentDidMount() {
        //Removing the already set localstorage, if someone not logged out - a minor hack
        localStorage.removeItem("admin-auth");
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Card className={classes.card}>

                        <div style={{ display: 'flex', flexDirection: 'column', width: '98%', marginRight: '2%' }}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="*Email Id"
                                type="email"
                                fullWidth
                                value={this.state.email}
                                onChange={(e) => {
                                    this.onEmailChange(e.target.value);
                                }}
                                className={classes.textField}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{color: 'red', fontSize: '.8em'}}>{this.state.emailError}</div>
                        <div className={classes.actionContainer}>
                        <Button size="small" variant="outlined" color="primary" onClick={(e) => this.userLogin()}>
                            ADMIN LOGIN
                        </Button>
                        <Link to="/" style={{color: '#000'}}>
                        <Button size="small" variant="outlined" color="primary" >
                            HOME
                        </Button>
                        </Link>
                        </div>
                </Card>
            </div>
        )
    }
}

LoginLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
    return state;
}

const MapDispatchToProps = (dispatch) => {
    return {
        userLogin: (status) => dispatch(onUserLoginLogout(status)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(LoginLayout));