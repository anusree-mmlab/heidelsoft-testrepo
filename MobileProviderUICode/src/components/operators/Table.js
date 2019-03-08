/*
* File: Tables.js
* Component to display the Operator info in tabular form
*/
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import EditFormDialog from './EditForm';
import { onPageChange } from '../../actions/Actions';


let counter = 0;
function createData(operator_id, operator, prefix, price, last_modified_date_time, edit) {
  counter += 1;
  return { id: counter, operator_id, operator, prefix, price, last_modified_date_time, edit};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'operator', numeric: false, disablePadding: false, label: 'Operator' },
  { id: 'prefix', numeric: false, disablePadding: true, label: 'Prefix' },
  { id: 'price', numeric: false, disablePadding: true, label: 'Price' },
  { id: 'last_modified_date_time', numeric: false, disablePadding: true, label: 'Created On' },
  { id: 'edit', numeric: false, disablePadding: true, label: '' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy,} = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => {
  return ({
    root: {
      paddingRight: theme.spacing.unit,
      backgroundColor: theme.palette.primary.light,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    tColor: {
      color: theme.palette.contrastText
    }
  })
}

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle" className={classes.tColor} >
          Operators - Prefixes - Rates
          </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 200,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: 'red',
    },
  },
  cell: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    maxWidth: '300px'
  }
});

class EnhancedTable extends React.Component {
  populateData = () => {
    this.tableData = [];
    if (!_.isNil(this.props.data)) {
      this.tableData = this.props.data;
    }
    const data = this.tableData.length > 0 ?
      this.tableData.map((tableDatum) => {
        return createData(
          tableDatum.operator_id,
          tableDatum.operator,
          tableDatum.prefix,
          tableDatum.price,
          tableDatum.last_modified_date_time,
          'edit');
      })
      : [];
    return data;
  }

  state = {
    order: 'desc',
    orderBy: 'operator_id',
    selected: [],
    data: this.populateData(),
    //page: 0,
    page: this.props.currentPage,
    rowsPerPage: 5,
  };


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.props.onPageChange(page);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (

      <Paper className={classes.root}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, idx) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell component="th" scope="row" padding="default"
                        className={classes.cell}>
                        {n.operator}
                      </TableCell>
                      
                      <TableCell style={{ textAlign: 'left' }} padding="none" className={classes.cell}>{n.prefix}</TableCell>
                      <TableCell style={{ textAlign: 'left' }} padding="none" className={classes.cell}>{n.price}</TableCell>
                      <TableCell style={{ textAlign: 'left' }} padding="none" className={classes.cell}>{moment(n.last_modified_date_time, moment.ISO_8601).format('MM/DD/YYYY HH:mm:ss')}</TableCell>
                      <TableCell>
                        <EditFormDialog Operator={n}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>

    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MapStateToProps = (state) => {
  return state;
}

const MapDispatchToProps = (dispatch) => {
  return {
    onPageChange: (page) => dispatch(onPageChange(page)),
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(withStyles(styles)(EnhancedTable));