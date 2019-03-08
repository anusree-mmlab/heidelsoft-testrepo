import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import asyncComponent from './hoc/AsyncComponent';
import reducer from './store/Reducer';

//Redux store
const store = createStore(reducer, applyMiddleware(thunk));

//Setting up the theme
const theme = createMuiTheme(
  {
    palette: {
     primary: { light: '#00bcd4', main: '#008394', dark: '#00bcd4' },
     secondary: grey,
     contrastText: '#fff',
    },
    status: {
      danger: 'orange',
    },
    typography: {
      useNextVariants: true,
    },
  }
);
//Lazy loading of components for better performance
const AsyncDashboard = asyncComponent(() => {
  return import('./containers/Dashboard/')
})

const AsyncIndex = asyncComponent(() => {
  return import('./containers/Index/')
})


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div>
            <Route path="/" exact component={AsyncIndex}/>
            <Route path="/admin" exact component={AsyncDashboard}/>
          </div>
        </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
