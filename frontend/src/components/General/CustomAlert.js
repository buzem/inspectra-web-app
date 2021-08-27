import React, { useEffect } from "react";

import { Button } from "@material-ui/core";


import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@material-ui/lab";


/**
 * Footer of the app
 * @param {props} props
 */
function CustomAlert(props) {
  

  useEffect(() => {
    console.log("alert triggered with ", props.title);
  }, []);

  return (
    // <div className={`${classes.listRoot} ${classes.alignCenter}`}>
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={props.onClick}>
          {props.buttonTitle}
        </Button>
      }
    >
      <AlertTitle>{props.title}</AlertTitle>
      {props.details}
    </Alert>
    /* <Grid
        container
        spacing={3}
        className={`${classes.roundBox} ${classes.warningsBox} ${classes.paper}`}
      >
        <Grid item sm={11} xs={12}>
          <Typography variant="h5" align="left">
            {props.title}
          </Typography>
          <Typography align="left">{props.details}</Typography>
        </Grid>
        {props.onDismissWarning ? (
          <Grid item sm={1} xs={12}>
            <IconButton onClick={props.onDismissWarning}>
              <CloseIcon />
            </IconButton>
          </Grid>
        ) : null}

        {props.buttonTitle ? (
          <Grid item sm={3} xs={12}>
            <Button
              onClick={props.onClick}
              variant="contained"
              className={classes.marginSides}
              disabled={props.buttonTitle === null}
            >
              {props.buttonTitle}
            </Button>
          </Grid>
        ) : null}
      </Grid> */
    // </div>
  );
}

// attributes of props and their type
CustomAlert.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  onDismissWarning: PropTypes.func,
};

export default CustomAlert;
