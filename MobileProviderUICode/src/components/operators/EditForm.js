/*
* File: EditForm.js
* Component to delete operator
* Material ui dialogue is used
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { onOperatorDelete } from '../../actions/Actions';


class EditFormDialog extends React.Component {
  state = {
    open: false,
    deleteClick: false,
    OperatorObj: {
    },
    formErrorMsg: ''
  };

  handleClickOpen = (Operator) => {
    this.setState({ open: true, OperatorObj: Operator });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteClickOpen = () => {
    this.setState({ deleteClick: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteClick: false });
  };

  render() {
    const OperatorData = this.props.Operator;

    return (
      <div>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={(e) => { this.handleDeleteClickOpen() }} style={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.deleteClick}
          onClose={this.handleDeleteClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            Are you sure, you want to delete ?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={(e) => { this.props.onDelete(
              OperatorData) }} color="primary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return state;
}

const MapDispatchToProps = (dispatch) => {
  return {
    onDelete: (operatorObj) => {
      dispatch(onOperatorDelete(operatorObj))
    },
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(EditFormDialog);