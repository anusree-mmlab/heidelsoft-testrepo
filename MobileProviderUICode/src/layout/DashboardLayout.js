
/*
* File: DashboardLayout.js
* The application admin layout is set here. Appbar, logout, a simple menu is there
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { onUserLoginLogout, AuthInfo } from '../actions/Actions';
import asyncComponent from '../hoc/AsyncComponent';
import classObj from '../index.css';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: '100%',
    minHeight: window.innerHeight - 50
  },
  avatar: {
    marginRight: 10,
    float: 'right',
    cursor: 'pointer'
  },
  logout: {
    color: '#000000de',
    cursor: 'pointer',
    maxWidth: '100',
    lineHeight: '250%',
    fontSize: '.8em'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10
  },
  profileContainer: {
    padding: '2% 1%',
    border: 'solid 1px #9c9c9c',
    backgroundColor: '#fff',
    position: 'absolute',
    right: '.2%',
    maxWidth: '300px',
    top: '85%',
    borderRadius: '2px',
  },
  profileRight: {
    marginRight: '1%',
    marginTop: '2%',
    clear: 'all',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto' ,
    whiteSpace: 'normal',
    color: '#292929',
    fontSize: '.9em'
  },
  profileRowOne: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5%',
    width: '100%'
  },
  profileButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '5%'
  },
  button: {
    width: '10%',
    backgroundColor: 'red',
    marginRight: '2%',
    fontSize: '.9em'
  }
});


const LazyDynamicComponents = (props) => {
  //Dynamically loading the required component, for performance optimisation
  const menu = props.menu;
  switch (menu) {
    case 'Operators':
      const OperatorCm = asyncComponent(() => {
        return import('../components/operators/Operator')
      });
      return (<OperatorCm></OperatorCm>);

    default: const DefaultCom = asyncComponent(() => {
      return import('../components/operators/Operator')
    });
      return (<DefaultCom></DefaultCom>);
  }
}

class Layout extends React.Component {
  state = {
    open: false
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.getAuthInfo();
    }, 100);
  }

  onLogout(status) {
    //Clear the local storage
    localStorage.removeItem("admin-auth");
    this.props.userLogout(!status);
  }

  render() {
    const { classes } = this.props;
    //Lazily loading component
    const innerComponent = (<LazyDynamicComponents menu={this.props.menu_name}></LazyDynamicComponents>);
  
    return (
      <div className={classes.root} >
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <Grid container spacing={24}>
              <Grid item xs={10}>
                <Link to="/" >
                  <img src={require('../static/images/phone_power.png')} alt="Home" width="20%" style={{paddingLeft: '1%'}}/>
                </Link>
              </Grid>
              
              <Grid item xs={2}>
                <Link to="/" style={{color: '#fff', marginRight: '5%'}}>Home</Link>
                <Button onClick={(e) => { this.onLogout(this.props.user_login) }} color="secondary" variant="contained" classes={{containedSecondary: classes.button}}>
                        Logout
                </Button>
                
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.show_loader ? <div>
            <div className={classes.overlay}></div>
            <div className={classObj.loader}></div>
          </div> : null}
          {innerComponent}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const MapStateToProps = (state) => {
  return state;
}

const MapDispatchToProps = (dispatch) => {
  return {
    userLogout: (status) => dispatch(onUserLoginLogout(status)),
    getAuthInfo: () => dispatch(AuthInfo()),
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles, { withTheme: true })(Layout));