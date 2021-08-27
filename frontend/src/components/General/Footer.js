import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  footerRoot: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
}));

/**
 * Footer of the app
 * @param {props} props
 */
function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.footerRoot}>
      <Typography variant="body1">
        <Link href="/" rel="noopener noreferrer" color="secondary">
          Inspectra - SEBA Master SS21 Team 38
        </Link>
      </Typography>
    </div>
  );
}

export default Footer;
