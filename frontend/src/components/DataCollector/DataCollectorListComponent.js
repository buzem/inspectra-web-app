import React from "react";
import {
  Button,
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
  Grid,
} from "@material-ui/core";
import PropTypes from "prop-types";
import DataCollectorListRow from "./DataCollectorListRow";
import styles from "../../theming/styles";
import image from "../../img/man-image.png";
import ConfirmDialog from "../General/ConfirmDialog";

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
        direction={orderBy === headCell.id ? order : "asc"}
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
    id: "name",
    label: "Name",
    width: "25%",
  },
  {
    id: "endpoint",
    label: "Endpoint",
    width: "35%",
  },
  {
    id: "method",
    label: "Method",
    width: "15%",
  },
  {
    id: "frequency",
    label: "Frequency",
    width: "10%",
  },
  {
    id: "paused",
    label: "Status",
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
 * For presenting and changing datacollectors
 * @param {props} props
 */
function DataCollectorListComponent(props) {
  // with this you can access the above defiend style classes
  const classes = styles();

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedDataCollector, setSelectedDataCollector] =
    React.useState(null);
  const [orderBy, setOrderBy] = React.useState();
  const [order, setOrder] = React.useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const onClickConfirmDelete = (dataCollector) => {
    setSelectedDataCollector(dataCollector);
    setConfirmOpen(true);
  };

  const deleteDataCollector = () => {
    props.onClickDeleteDataCollector(selectedDataCollector._id);
  };

  return (
    <div className={`${classes.listRoot} ${classes.alignCenter}`}>
      <div className={classes.listHeader}>
        <ConfirmDialog
          title={"Delete " + selectedDataCollector?.title}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteDataCollector}
        >
          Are you sure you want to delete the Data Collector
          {selectedDataCollector?.title}?
        </ConfirmDialog>
        <Grid
          container
          spacing={3}
          className={`${classes.roundBox} ${classes.titleBox} ${classes.paper} ${classes.paddingLarge}`}
        >
          <Grid item sm={9} xs={12}>
            <Typography variant="h1" align="left">
              Data Collectors
            </Typography>
            <Grid container className={`${classes.marginTop}`}>
              <Grid item sm={8} xs={12}>
                <Typography variant="body1" align="left">
                  Collect data from any API or be the first who knows that your own website
                  is down. Reliable monitoring warns you before any significant
                  troubles and gives you new data insights.
                </Typography>
                <Button
                  onClick={props.onAddDataCollector}
                  variant="contained"
                  color="primary"
                  className={`${classes.addButton} ${classes.marginTopLarge}`}
                >
                  Collect Data
                </Button>
              </Grid>
              <Grid item sm={1} xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item sm={3} xs={12} className={`${classes.alignCenter}`}>
            <img src={image} alt="img" width="100%" />
          </Grid>
        </Grid>

        <Paper
          className={`${classes.paper} ${classes.shadow} ${classes.roundBox} ${classes.borderBox} ${classes.marginTopXLarge}`}
        >
          <TableContainer>
            <Table>
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

                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(props.datacollectors, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dataCollector, index) => {
                    return (
                      <DataCollectorListRow
                        key={index}
                        dataCollector={dataCollector}
                        onClickDisplayDataCollector={
                          props.onClickDisplayDataCollector
                        }
                        onClickConfirmDelete={onClickConfirmDelete}
                        isAdmin={props.isAdmin}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.datacollectors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

// attributes of props and their type
DataCollectorListComponent.propTypes = {
  onAddDataCollector: PropTypes.func.isRequired,
  onClickDeleteDataCollector: PropTypes.func.isRequired,
  onClickDisplayDataCollector: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  datacollectors: PropTypes.array,
};

export default DataCollectorListComponent;
