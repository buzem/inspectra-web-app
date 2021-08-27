import React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
// import { Rating } from "@material-ui/lab";

/**
 * For presenting and changing notifications
 * @param {props} props
 */
function NotificationListRow(props) {
  // with this you can access the above defiend style classes

  return (
    <TableRow
      key={props.notification._id}
      onClick={() => props.onClickDisplayNotification(props.notification._id)}
      height="80px"
    >
      <TableCell>
        <Typography variant="h6">{props.notification.title}</Typography>
      </TableCell>
      {/* <TableCell>
                    {props.notification.rule}
            </TableCell> */}
      <TableCell align="center">{props.notification.criticalvalue}</TableCell>
      <TableCell align="center">{props.notification.channel}</TableCell>
      <TableCell align="center">{props.notification.updatedAt}</TableCell>
      {/* <TableCell>
                    { props.notification.paused ? "off" : "active" }
            </TableCell> */}

      <TableCell align="center">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.onClickConfirmDelete(props.notification);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// attributes of props and their type
NotificationListRow.propTypes = {
  notification: PropTypes.object,
  onClickDisplayNotification: PropTypes.func,
  onClickConfirmDelete: PropTypes.func,
};

export default NotificationListRow;
