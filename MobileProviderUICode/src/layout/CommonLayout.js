
/*
* File: CommonLayout.js
* The application CommonLayout is set here. Appbar and content
*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
});


class CommonLayout extends React.Component {
  render() {
    const { classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar,classes.appBarShift)}
        >
          <Toolbar disableGutters={true}>
            <Grid container spacing={24}>
              <Grid item xs={10}>
              <Link to="/" >
              <img src={require('../static/images/phone_power.png')} alt="service provider" width="20%"
              style={{paddingLeft: '1%'}}/>
              </Link>
              </Grid>
              <Grid item xs={2}>
                  <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '2%', width: '98%'}}>
                    <Link to="/admin" style={{color: '#FFF', fontSize: '1em', width: '100%'}}>Admin</Link>
                  </div>
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
          {this.props.children}
        </main>
      </div>
    );
  }
}

CommonLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const MapStateToProps = (state) => {
  return state;
}

export default connect(MapStateToProps)(withStyles(styles, { withTheme: true })(CommonLayout));