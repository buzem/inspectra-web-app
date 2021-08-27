import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getDashboards, deleteDashboard } from "../redux/actions";
import { getGraphs, deleteGraph } from "../redux/actions";
import DashboardsListComponent from "../components/Dashboard/DashboardsListComponent";
import GraphsListComponent from "../components/Graph/GraphsListComponent";
import Loading from "../components/General/Loading";
import { Button,  Grid, Typography } from "@material-ui/core";
import styles from "../theming/styles";
import image from "../img/man-image-creations.png";

/**
 * @param {props} props
 */
function CreationsView(props) {
  const classes = styles();

  // state from the redux store
  const user = useSelector((state) => state.user);

  const dashboards = useSelector((state) => state.dashboards.dashboards);
  const graphs = useSelector((state) => state.graphs.graphs);

  useEffect(() => {
    if (!graphs) {
      loadGraphs();
    }
    if (!dashboards) {
      loadDashboards();
    }
  }, []);

  const loadDashboards = async () => {
    await props.dispatch(getDashboards());
  };

  const loadGraphs = async () => {
    await props.dispatch(getGraphs());
  };

  const onClickDeleteDashboard = (id) => {
    // trigger the redux action delete dashobard
    props.dispatch(deleteDashboard(id));
  };

  const onClickDisplayDashboard = (id) => {
    // navigate to details of the selected dashboard and push dashboard
    props.history.push(
      "/dashboard/" + id
      // {
      //   dashboard: dashboards.find((element) => element.id === id),
      // }
    );
  };

  const onAddDashboard = () => {
    // navigate to an empty mask for entering details of the new dashboard
    props.history.push({
      pathname: "dashboard/new",
      state: { graphs: graphs },
    });
  };

  const onAddGraph = () => {
    // navigate to an empty mask for entering details of the new graph
    props.history.push("graph/new");
  };

  const onClickDeleteGraph = (id) => {
    // trigger the redux action delete graph
    props.dispatch(deleteGraph(id));
  };

  const onClickDisplayGraph = (id) => {
    // navigate to details of the selected graph

    props.history.push("/graph/" + id);
  };

  return (
    <div className={`${classes.listRoot} ${classes.alignCenter}`}>
      <div className={classes.listHeader}>
        <Grid
          container
          spacing={3}
          className={`${classes.roundBox} ${classes.titleBox} ${classes.paper} ${classes.paddingLarge}`}
        >
          <Grid item sm={9} xs={12}>
            <Typography variant="h1" align="left">
              Your Collections
            </Typography>
            <Grid container className={`${classes.marginTop}`}>
              <Grid item sm={8} xs={12}>
                <Typography variant="body1" align="left">
                 Create Graphs from your collecte data and combine multiple Graphs into Dasboards. Inspectra allows you to have bright visual insights and generate insighs from your information. 
                </Typography>
              </Grid>
              <Grid item sm={1} xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item sm={3} xs={12} className={`${classes.alignCenter}`}>
            <img src={image} alt="img" width="100%" />
          </Grid>
        </Grid>

        <Grid container className={classes.marginTopLarge}>
          <Grid item sm={10} xs={12} className={classes.marginTopLarge}>
            <Typography variant="h4" align="left">
              Dashboards
            </Typography>
          </Grid>
          <Grid item sm={2} xs={12} className={classes.marginTop}>
            <div className={`${classes.flexRow} ${classes.flexEnd}`}>
              <Button
                onClick={onAddDashboard}
                variant="contained"
                color="primary"
                className={`${classes.addButton}`}
              >
                Create Dashboard
              </Button>
            </div>
          </Grid>
        </Grid>

        {dashboards ? (
          <DashboardsListComponent
            dashboards={dashboards}
            onClickDisplayDashboard={onClickDisplayDashboard}
            onClickDeleteDashboard={onClickDeleteDashboard}
            onAddDashboard={onAddDashboard}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
          />
        ) : (
          <Loading />
        )}

        <Grid container className={`${classes.marginTopLarge}`}>
          <Grid item sm={10} xs={12} className={classes.marginTopLarge}>
            <Typography variant="h4" align="left">
              Graphs
            </Typography>
          </Grid>
          <Grid item sm={2} xs={12} className={classes.marginTop}>
            <div className={`${classes.flexRow} ${classes.flexEnd}`}>
              <Button
                onClick={onAddGraph}
                variant="contained"
                color="primary"
                className={classes.addButton}
              >
                Create Graph
              </Button>
            </div>
          </Grid>
        </Grid>

        {graphs ? (
          <GraphsListComponent
            graphs={graphs}
            onClickDisplayGraph={onClickDisplayGraph}
            onClickDeleteGraph={onClickDeleteGraph}
            onAddGraph={onAddGraph}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

// connect() establishes the connection to the redux functionalities
export default connect()(CreationsView);
