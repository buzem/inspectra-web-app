import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";

import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({}));

/**
 * @param {props} props
 */
function GraphListRow(props) {
  // with this you can access the above defiend style classes


  return (
    <TableRow
      key={props.graph._id}
      onClick={() => props.onClickDisplayGraph(props.graph._id)}
      height="60px"
    >
      <TableCell>
        <Typography variant="h6">{props.graph.title}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{props.graph.createdAt.substring(0, 10)}</Typography>
      </TableCell>
      {/* <TableCell>
        <Typography>{props.graph.userId}</Typography>
      </TableCell> */}
      <TableCell>
        <Typography>{props.graph.dataCollectorId}</Typography>
      </TableCell>

      <TableCell>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
            />
          }
        />
      </TableCell>

      <TableCell>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.onClickConfirmDelete(props.graph);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// attributes of props and their type
GraphListRow.propTypes = {
  graph: PropTypes.object,
  onClickDisplayGraph: PropTypes.func,
  onClickConfirmDelete: PropTypes.func,
};

export default GraphListRow;
