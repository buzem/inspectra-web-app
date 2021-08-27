import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DataCollectorEventsListRow from "./DataCollectorEventsListRow";
import styles from "../../theming/styles";

/**
 * header cells for sortable table columns
 * @param {props} props
 */
function SortableTableHeadCell(props) {
  const { headCell, order, orderBy, onRequestSort } = props;

  return (
    <TableCell
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
      align="left"
      width={props.width}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : "desc"}
        onClick={onRequestSort}
      >
        {headCell.label}
      </TableSortLabel>
    </TableCell>
  );
}

// data for sortable table columns
const sortableHeadCells = [
  {
    id: "timestamp",
    label: "Data Collection Time",
    width: "40%",
  },
  {
    id: "statusCode",
    label: "Status Code",
    width: "15%",
  },
  {
    id: "responseTime",
    label: "Response Time",
    width: "15%",
  },
  {
    id: "responseSize",
    label: "Response Size",
    width: "15%",
  },
  {
    id: "view",
    label: "Data",
    width: "10%",
  },
];

/**
 * Comparator for two objects on a generic property
 * @param {compare object a} a
 * @param {compare object b} b
 * @param {order by property name} orderBy
 * @returns 1 when b > a, -1 when a < b
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Get comparator for sorting table
 * @param {asc or desc} order
 * @param {order by propoerty name} orderBy
 * @returns function that compares two objects
 */
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sort array with respect to the initial order of the objects
 * @param {to sort array} array
 * @param {comparator for sorting} comparator
 * @returns sorted array
 */
function stableSort(array, comparator) {
  // include index into the to sortable array objects
  const stabilizedThis = array.map((el, index) => [el, index]);
  // sort the array
  stabilizedThis.sort((a, b) => {
    // compare two array objects a[0] or b[0] refer to the original element of the list a[1] or b[1] would be the initial index
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    // if both objects have the same property value in the order by property, their initial order in the array is maintained
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * @param {props} props
 */
function DataCollectorEventsListComponent(props) {
  // with this you can access the above defiend style classes
  const classes = styles();

  const [orderBy, setOrderBy] = React.useState();
  const [order, setOrder] = React.useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const onRequestSort = (cellId, event) => {
    // if the current orderBy is also the clicked property then the direction of the sorting should be changed
    // otherwise the fist order direction is always ascending
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");

    // setting the called cell id as order by
    setOrderBy(cellId);
  };

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={`${classes.listRoot} ${classes.alignLeft}`}>
      <div className={classes.listHeader}>
        <div className="rowC">
          <Typography variant="h5" align="left">
            Data Collection Events
          </Typography>
        </div>
      </div>
      <Paper className={`${classes.shadow} ${classes.paper} ${classes.roundBox} ${classes.borderBox}`}>
        <TableContainer className={`${classes.roundTop} ${classes.tableThinLines}`}>
          <Table className="zui-table zui-table-horizontal zui-table-highlight zui-table-rounded">
            <TableHead>
              <TableRow>
                {sortableHeadCells.map((headCell, index) => (
                  <SortableTableHeadCell
                    key={index}
                    order={order}
                    orderBy={orderBy}
                    headCell={headCell}
                    onRequestSort={() => onRequestSort(headCell.id)}
                    width={headCell.width}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(
                props.dataCollectorEvents,
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataCollectorEvents, index) => {
                  return (
                    <DataCollectorEventsListRow
                      key={index}
                      event={dataCollectorEvents}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={props.dataCollectorEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          className={`${classes.roundBottom}`}
        />
      </Paper>
    </div>
  );
}

// attributes of props and their type
DataCollectorEventsListComponent.propTypes = {
  dataCollectorEvents: PropTypes.array,
};

export default DataCollectorEventsListComponent;
