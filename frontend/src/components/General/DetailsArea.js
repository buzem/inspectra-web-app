import React from "react";
import PropTypes from "prop-types";
import { Typography, Paper } from "@material-ui/core";
import styles from "../../theming/styles";

/**
 * @param {props} props
 */
function DetailsArea(props) {
    const classes = styles();

    return (
        <Paper className={`${classes.flexCol} ${classes.boxPaddingLarge} ${classes.roundBox} ${classes.borderBox} ${classes.shadow}`}>
            <Typography variant="h4" align="left">
                {props.title}
            </Typography>
            <div className={`${classes.padding}`}>
                {props.content}
            </div>
        </Paper>
    );
}

// attributes of props and their type
DetailsArea.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default DetailsArea;
