import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";

// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({}));

/**
 * @param {props} props
 */
function DashboardListRow(props) {
  // with this you can access the above defiend style classes
  const classes = useStyles();

  return (
    <TableRow
      key={props.dashboard._id}
      onClick={() => props.onClickDisplayDashboard(props.dashboard._id)}
      height="60px"
    >
      <TableCell>
        <Typography variant="h6">{props.dashboard.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.dashboard.userId}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.dashboard.createdAt.substring(0, 10)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.dashboard.graphs.length}</Typography>
      </TableCell>

      <TableCell>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.onClickConfirmDelete(props.dashboard);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// attributes of props and their type
DashboardListRow.propTypes = {
  dashboard: PropTypes.object,
  onClickDisplayDashboard: PropTypes.func,
  onClickDeleteDashboard: PropTypes.func,
};

export default DashboardListRow;
