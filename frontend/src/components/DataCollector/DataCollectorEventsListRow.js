import React from "react";
import { Button, TableCell, TableRow, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StatusButton, AlertButton } from '../../theming/objects';


/**
 * @param {props} props
 */
function DataCollectorEventsListRow(props) {

    const [open, setOpen] = React.useState(false);

    const openDialogBox = () => {
      setOpen(true);
    };
  
    const closeDialogBox = () => {
      setOpen(false);
    };

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '. ' + month + ' ' + year + ' ' + hour + ':' + min ; // + ':' + sec
        return time;
      }

    return (
        <TableRow
            key={props.event._id}
            height="70px"
        >
            <TableCell>
                <Typography variant="h6">
                    {timeConverter(props.event.timestamp)}
                </Typography>
            </TableCell>
            <TableCell>
                {props.event.statusCode < 300 ? (
                    <StatusButton>
                        {props.event.statusCode}
                    </StatusButton>
                ) : (
                    <AlertButton>
                        {props.event.statusCode}
                    </AlertButton>
                )}
            </TableCell>
            <TableCell>
                <Typography>
                    {props.event.responseTime}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {props.event.responseSize}
                </Typography>
            </TableCell>
            <TableCell>
            <Button onClick={openDialogBox}
                    variant="contained"
                    color="primary">
                View
            </Button>
            <Dialog open={open}
                onClose={closeDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Data Collection Event Data"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <pre>{ JSON.stringify(props.event.data, null, '\t') }</pre>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialogBox} color="primary" autoFocus>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
            </TableCell>
        </TableRow>
    );
}

// attributes of props and their type
DataCollectorEventsListRow.propTypes = {
    event: PropTypes.object
};

export default DataCollectorEventsListRow;
