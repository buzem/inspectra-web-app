import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

  const StatusButton = withStyles({
    root: {
      borderRadius: 7,
      background: "rgba(80, 203, 147, 0.3)",
      color: 'green',
      height: 27,
      margin: 3,
      "&:hover": {
        background: "rgba(80, 203, 147, 0.3)",
        color: 'green',
        cursor: "default"
      }
    },
    label: {
      textTransform: 'none',
    },
  })(Button);

  const AlertButton = withStyles({
    root: {
      borderRadius: 7,
      background: "rgba(218, 0, 55, 0.3)",
      color: 'darkred',
      height: 27,
      margin: 3,
      "&:hover": {
        background: "rgba(218, 0, 55, 0.3)",
        color: 'darkred',
        cursor: "default"
      }
    },
    label: {
      textTransform: 'none',
    },
  })(Button);

  const WarnButton = withStyles({
    root: {
      borderRadius: 7,
      background: "rgba(255, 169, 0, 0.3)",
      color: "rgb(176, 118, 4)",
      height: 27,
      margin: 3,
      "&:hover": {
        background: "rgba(255, 169, 0, 0.3)",
        color: "rgb(176, 118, 4)",
        cursor: "default"
      }
    },
    label: {
      textTransform: 'none',
    },
  })(Button);

  const RequestButton = withStyles({
    root: {
      borderRadius: 7,
      background: "rgba(206, 206, 206, 0.6)",
      color: 'black',
      height: 27,
      margin: 3,
      "&:hover": {
        background: "rgba(206, 206, 206, 0.6)",
        color: 'black',
        cursor: "default"
      }
    },
    label: {
      textTransform: 'uppercase',
    },
  })(Button);

  const NeutralButton = withStyles({
    root: {
      borderRadius: 7,
      background: "rgba(206, 206, 206, 0.3)",
      color: 'grey',
      height: 27,
      margin: 3,
      "&:hover": {
        background: "rgba(206, 206, 206, 0.3)",
        color: 'grey',
        cursor: "default"
      }
    },
    label: {
      textTransform: 'lowercase',
    },
  })(Button);

  export {StatusButton, AlertButton, WarnButton, RequestButton, NeutralButton};