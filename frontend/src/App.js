import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollContainer from "./components/General/ScrollContainer";

import reducers from "./redux/reducers";
import routes from "./routes";
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";
import AppTheme from "./theming/themetypes";
import AppThemeOptions from "./theming/themes";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import styles from "./theming/styles";

function App() {
  const classes = styles();

  // set document title
  useEffect(() => {
    document.title = "Inspectra";
  }, []);
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // create store for redux
  const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunkMiddleware))
  );

  console.log(store.getState());
  // theme for app
  const [theme, setTheme] = React.useState(AppTheme.LIGHT);

  // toggle theme
  const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };

  const onClose = () => {
    // tbd onCLose
  };

  return (
    <div className={classes.appRoot}>
      <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
        <Provider store={store}>
          <CssBaseline />
          <React.Fragment>
            <Header
              darkmode={theme === AppTheme.DARK}
              toggletheme={toggleTheme}
              onClose={onClose}
            />
            <ScrollContainer className={classes.paddingTop}>
              <Switch>
                {routes.map((route, i) => (
                  <Route key={i} {...route} />
                ))}
              </Switch>
              <Footer />
            </ScrollContainer>
          </React.Fragment>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
