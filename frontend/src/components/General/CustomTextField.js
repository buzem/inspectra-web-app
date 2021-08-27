import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";
import styles from "../../theming/styles";

/**
 * @param {props} props
 */
function CustomTextField(props) {

  const classes = styles();
  const [value, setValue] = React.useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={classes.textfielRoot}>
      {(props.value === "" || !props.value || props.value === null) &&
      !props.editMode ? (
        // if no value is given return the given text
        <TextField
          multiline={props.multiline}
          value={props.isEmptyText}
          disabled={true}
          variant="standard"
          InputProps={{
            className: classes.inputBase,
            disableUnderline: true,
          }}
          inputProps={{
            className: classes.input,
          }}
          {...props.furtherProps}
        />
      ) : props.type !== "date" ? (
        // return a standard textfield
        <TextField
          multiline={props.multiline}
          rows={props.row}
          label={props.label}
          value={
            props.editMode
              ? value
              : props.value + (props.suffix ? " " + props.suffix : "")
          }
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) =>
            props.onChange ? props.onChange(e.target.value) : null
          }
          disabled={!props.editMode}
          variant={props.editMode ? "outlined" : "standard"}
          InputProps={
            props.editMode
              ? {
                  className: classes.inputBase,
                }
              : {
                  className: classes.inputBase,
                  disableUnderline: true,
                }
          }
          inputProps={{
            className: classes.input,
          }}
          {...props.furtherProps}
        />
      ) : (
        // if the field has a value and the type is date return a datepicker
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="dd.MM.yyyy"
            value={props.value}
            readOnly={!props.editMode}
            keyboardIcon={props.editMode ? <TodayIcon /> : null}
            variant={props.editMode ? "outlined" : "standard"}
            InputProps={{
              className: classes.inputBase,
              disableUnderline: true,
            }}
            inputProps={{
              className: classes.input,
            }}
            {...props.furtherProps}
            onChange={(date) => (props.onChange ? props.onChange(date) : null)}
            invalidDateMessage=""
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </div>
  );
}

// attributes of props and their type
CustomTextField.propTypes = {
  align: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  editMode: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  furtherProps: PropTypes.any,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CustomTextField;
