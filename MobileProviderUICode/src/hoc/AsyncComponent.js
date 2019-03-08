
/*
* File: AsyncComponent.js
* A Higher Order Component to dynamically load component from a provided file path
* Is for lazy loading which helps for application performance
*/
import React, { Component } from 'react';

const asyncComponent = (ImportComponent) => {

    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            ImportComponent().then(
                (cmp) => {
                    this.setState({ component: cmp.default });
                }
            )
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

}

export default asyncComponent;