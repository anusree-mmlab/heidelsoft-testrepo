/*
* File: PrefixInput.js
* Component to choose prefix with rate from a already set Operators list, display the data list, delete a prefix + rate
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getOperatorList } from '../../actions/Actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputContainer: {
        display: 'flex',
        minWidth: '100%',
        padding: '0% 2%',
        justifyContent: 'space-between'
    },
});

class Operators extends Component {
    state = {
        phoneNumber: '',
        errorMessage: '',
        operatorInfo: ''
    }

    componentWillMount() {
        //Grab the operator list, later which is filtered to find out the match for the input phone number.
        this.props.loadOperatorList();
    }

    onPhoneNumberChange(val) {
        this.setState({ phoneNumber: val });
        if (this.state.operatorInfo !== '') {
            this.setOperatorInfo('');
        }
        //Validate phone number
        this.validatePhoneNumber(val);
    }

    setOperatorInfo(message) {
        this.setState({ operatorInfo: message });
    }

    validatePhoneNumber(phoneno) {
        const rule = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,6})$/;
        const isValidPhoneNumber = rule.test(phoneno);
        if (isValidPhoneNumber) {
            this.setState({ errorMessage: '' });
            return true;
        } else {
            this.setState({ errorMessage: 'Invalid phone number.' });
            return false;
        }
    }

    getOperatorInfo = (phoneNumberToMatch) => {
        //Replace all the special characters from the prefix as well as the input mobile number
        const prefixArrOriginal = this.props.OperatorData;
        const prefixArr = prefixArrOriginal.map((pObj) => { return { ...pObj, prefix: pObj.prefix.replace(/[^a-zA-Z0-9]/g, '') } });
        phoneNumberToMatch = phoneNumberToMatch.replace(/[^a-zA-Z0-9]/g, '');

        const stringArr = phoneNumberToMatch.split('');
        let prefixMatchArr = [];

        for (let n = 0; n < prefixArr.length; n++) {
            const prefix = prefixArr[n].prefix;
            let recStr = '';
            for (let m = 0; m < stringArr.length; m++) {
                const element = stringArr[m];
                recStr += element;
                const index = prefix.indexOf(recStr);
                if (index !== 0 && m === 0) {
                    //No Match
                    prefixMatchArr.push({ operatorName: prefixArr[n].operator, matchStr: '', price: 0 });
                    break;
                } else {
                    if (index === 0) {
                        if (m === stringArr.length - 1) {
                            //Full match
                            prefixMatchArr.push({ operatorName: prefixArr[n].operator, matchStr: recStr, price: prefixArr[n].price });
                            break;
                        } else {
                            continue;
                        }
                    } else {
                        //A match found somewhere
                        const matchedStr = recStr.substring(0, recStr.length - 1)
                        prefixMatchArr.push({ operatorName: prefixArr[n].operator, matchStr: matchedStr, price: prefixArr[n].price });
                        break;
                    }
                }
            };
        };
        return prefixMatchArr;

    }

    handleSubmit() {
        if (_.trim(this.state.phoneNumber) === '') {
            this.setOperatorInfo('No phone number is provided');
            return true;
        }
        if (this.validatePhoneNumber(this.state.phoneNumber)) {
            //Show the Desired Operator info
            const matchArr = this.getOperatorInfo(this.state.phoneNumber);

            const closestMatch = matchArr.reduce((a, b) => { return a.matchStr.length > b.matchStr.length ? a : b; });

            if (Object.keys(closestMatch).length > 0) {
                if (closestMatch.matchStr !== '') {
                    this.setOperatorInfo(`You can choose ${closestMatch.operatorName} with the matched prefix <${closestMatch.matchStr}> for the rate $${closestMatch.price}.`);
                } else {
                    this.setOperatorInfo('No match found');
                }
            } else {
                this.setOperatorInfo('No match found, error occured');
            }
        } else {
            //this.setOperatorInfo('Invalid Mobile Number');
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24} className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.inputContainer}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '55%', marginRight: '2%' }}>
                                <TextField
                                    margin="dense"
                                    id="phone_number"
                                    label="*Phone number"
                                    type="text"
                                    fullWidth
                                    value={this.state.phoneNumber}
                                    onChange={(e) => {
                                        this.onPhoneNumberChange(e.target.value);
                                    }}
                                    className={classes.textField}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ color: 'red', fontSize: '.8em' }}>{this.state.errorMessage}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '23%', marginRight: '2%' }}>
                                <Button variant="contained" color="primary" onClick={(e) => this.handleSubmit()} style={{ width: '100%', maxWidth: '150px' }}>
                                    Choose Operator
                            </Button>
                            </div>
                        </div>

                        <div style={{ padding: '2%', fontSize: '1.2 em', color: 'black' , width: '100%', display: 'flex', wordBreak: 'break-word', whiteSpace: 'normal' }}>{this.state.operatorInfo}</div>
                        <div style={{fontSize: '.7em', width: '100%', wordBreak: 'break-word', whiteSpace: 'normal'}}>
                            Supported phone number formats are :
                            +XX-XXXX-XXXX <br/>
                            +XX.XXXX.XXXX <br/>
                            +XX XXXX XXXX <br/>
                            XXXXXXXXXX <br/>
                        </div>
                    </Paper>
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

