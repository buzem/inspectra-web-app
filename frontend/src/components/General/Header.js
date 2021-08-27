import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import logo from "../../img/logo_transparent.png";
import styles from "../../theming/styles";

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
  const classes = styles();

  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onClickLogin = () => {
    // navigate to the login page
    props.history.push("/login");
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());
    // navigate to the home page
    props.history.push("/");
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        className={`${classes.toolbar} ${classes.paddingSmall} ${classes.borderBox} ${classes.shadow}`}
      >
        <img
          src={logo}
          alt="profile"
          height="50px"
          onClick={() => props.history.push("/")}
        />
        <Typography
          className={classes.toolbarTitle}
          variant="h5"
          color="#000000"
        >
          Inspectra
        </Typography>
        <Button onClick={() => props.history.push("/")} color="inherit">
          Data Collectors
        </Button>
        <Button
          onClick={() => props.history.push("/creations")}
          color="inherit"
        >
          My Creations
        </Button>
        <Button
          onClick={() => props.history.push("/notifications")}
          color="inherit"
          style={{ marginRight: 12 }}
        >
          Notifications
        </Button>
        {user.user
          ? [
              <Button
                key="user"
                className={classes.menuitem}
                color="inherit"
                style={{ marginRight: 15 }}
              >
                <Avatar className={classes.avatar} style={{ marginRight: 7 }}>
                  {user.user.username ? user.user.username[0] : ""}
                </Avatar>
                <Divider key="divider" />
                {user.user.username}
              </Button>,
              <Button
                key="logout"
                onClick={onClickLogout}
                className={classes.menuitem}
                variant="contained"
                color="secondary"
              >
                Logout
              </Button>,
            ]
          : [
              <Button
                key="login"
                onClick={onClickLogin}
                className={classes.menuitem}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>,
            ]}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  anchor: PropTypes.element,
};

export default connect()(withRouter(Header));
