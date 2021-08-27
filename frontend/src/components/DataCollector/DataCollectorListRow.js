import React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import { StatusButton, RequestButton, WarnButton } from "../../theming/objects";

/**
 * For presenting and changing datacollectors
 * @param {props} props
 */
function DataCollectorListRow(props) {
  // with this you can access the above defiend style classes

  return (
    <TableRow
      key={props.dataCollector._id}
      onClick={() => props.onClickDisplayDataCollector(props.dataCollector._id)}
      height="80px"
    >
      <TableCell>
        <Typography variant="h6">{props.dataCollector.title}</Typography>
      </TableCell>
      <TableCell>
        {props.dataCollector.endpoint.length > 50
          ? props.dataCollector.endpoint.substr(0, 50) + "..."
          : props.dataCollector.endpoint}
      </TableCell>
      <TableCell>
        <RequestButton>{props.dataCollector.method}</RequestButton>
      </TableCell>
      <TableCell>
        <RequestButton>{props.dataCollector.frequency}</RequestButton>
      </TableCell>
      <TableCell>
        {props.dataCollector.paused ? (
          <WarnButton>paused</WarnButton>
        ) : (
          <StatusButton>active</StatusButton>
        )}
      </TableCell>
      <TableCell>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.onClickConfirmDelete(props.dataCollector);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// attributes of props and their type
DataCollectorListRow.propTypes = {
  dataCollector: PropTypes.object,
  onClickDisplayDataCollector: PropTypes.func,
  onClickConfirmDelete: PropTypes.func,
};

export default DataCollectorListRow;
