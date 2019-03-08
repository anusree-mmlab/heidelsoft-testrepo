/*
* File: CreateForm.js
* Component to create prefix
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import _ from 'lodash';
import { onOperatorCreate } from '../../actions/Actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: window.innerWidth
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '50%',
    },
    title: {
        whiteSpace: 'normal',
        width: '100%',
        color: '#000',
        padding: '1% 2%',
        fontWeight: 'normal',
        fontSize: '1.6em'
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        backgroundColor: '#fff',
        //minWidth: '200px',
        //marginRight: '10px'
    },
    inputContainer: {
        display: 'flex',
        minWidth: '100%',
        padding: '0% 2%',
        justifyContent: 'space-between'
    },
    colorPrimary: {
        color: '#000'
    }
});

class CreateForm extends React.Component {
    state = {
        open: false,
        OperatorObj: {
            operator_id: '',
            operator: '',
            prefix: '',
            price: '',
            last_modified_date_time: (new Date()).toISOString()
        },
        formErrorMsg: ''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    clearForm = () => {
        this.setState({
            OperatorObj: {
                operator_id: '',
                operator: '',
                prefix: '',
                price: '',
                last_modified_date_time: (new Date()).toISOString()
            }
        })
    }

    handleSubmit = () => {
        console.log(this.state.OperatorObj)
        // Validate empty values
        if (_.trim(this.state.OperatorObj.operator) === '' ||
            _.trim(this.state.OperatorObj.prefix) === '' ||
            _.trim(this.state.OperatorObj.price) === ''
        )  {
            this.setState({ formErrorMsg: '*Please set all the required values' });
        }
        else {
            this.props.onSave({ ...this.state.OperatorObj, last_modified_date_time: (new Date()).toISOString() });
            this.setState({ formErrorMsg: '' });
            this.clearForm();
            this.setState({ open: false });
        }
    };

    handleChangeOperator(value) {
        this.setState({OperatorObj: {...this.state.OperatorObj, operator: value}});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography color="primary" variant="headline" className={classes.title}>
                    Operators and Prefixes
                  </Typography>
                <div className={classes.inputContainer}>

                    <div className={classes.root}>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="operator-native-simple">Operator</InputLabel>
                    <Select
                        native
                        value={this.state.OperatorObj.operator}
                        onChange={(e) => this.handleChangeOperator(e.target.value)}
                        inputProps={{
                        name: 'operator',
                        id: 'operator-native-simple',
                        }}
                    >
                        <option value="" />
                        <option value={'Operator 1'}>Operator 1</option>
                        <option value={'Operator 2'}>Operator 2</option>
                    </Select>
                    </FormControl>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '25%', marginRight: '2%' }}>
                        <TextField
                            margin="dense"
                            id="Prefix"
                            label="*Prefix"
                            type="text"
                            fullWidth
                            value={this.state.OperatorObj.prefix}
                            onChange={(e) => {
                                this.setState(
                                    {
                                        OperatorObj: { ...this.state.OperatorObj, prefix: e.target.value }
                                    })
                            }}
                            className={classes.textField}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '25%', marginRight: '2%' }}>
                        <TextField
                            margin="dense"
                            id="Price"
                            label="*Rate"
                            type="text"
                            fullWidth
                            value={this.state.OperatorObj.price}
                            onChange={(e) => {
                                this.setState(
                                    {
                                        OperatorObj: { ...this.state.OperatorObj, price: e.target.value }
                                    })
                            }}
                            className={classes.textField}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '13%', marginRight: '2%' }}>
                        <Button variant="contained" color="primary" onClick={(e) => this.handleSubmit()} style={{ width: '100%', maxWidth: '150px' }}>
                            Save
                    </Button>
                    </div>
                </div>

                <Typography color="primary" variant="subheading" style={{ color: 'red', fontSize: '.8em', whiteSpace: 'normal', width: '100%', marginLeft: '2%' }}>
                    {this.state.formErrorMsg}
                </Typography>
    
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return state;
}

const MapDispatchToProps = (dispatch) => {
    return {
        onSave: (OperatorObj) => dispatch(onOperatorCreate(OperatorObj)),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(CreateForm));