import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import DetailsArea from "../General/DetailsArea";
import { withRouter } from "react-router-dom";
import DataCollectorCreateForm from "./DataCollectorCreateForm";
import DataCollectorEventsListComponent from "./DataCollectorEventsListComponent";
import GraphComponent from "../Graph/GraphComponent";
import {
  StatusButton,
  RequestButton,
  NeutralButton,
  WarnButton,
} from "../../theming/objects";
import styles from "../../theming/styles";

/**
 * For presenting and changing dataCollector details
 * @param {props} props
 */
function DataCollectorDetailsComponent(props) {
  const classes = styles();

  const [title, setTitle] = React.useState("");
  const [endpoint, setEndpoint] = React.useState("");
  const [frequency, setFrequency] = React.useState(null);
  const [paused, setPaused] = React.useState(false);
  const [method, setMethod] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [body, setBody] = React.useState("");
  const [id, setId] = React.useState("");
  const [dataCollectorEvents, setDataCollectorEvents] = React.useState(null);

  // const [dataCollectorId, setDataCollectorId] = React.useState("");

  // for extracting the attributes of the given dataCollector to the approriate state variables
  const extractDataCollector = () => {
    if (!props.dataCollector) {
      return;
    }
    setTitle(props.dataCollector.title);
    setEndpoint(props.dataCollector.endpoint);
    setFrequency(props.dataCollector.frequency);
    setPaused(props.dataCollector.paused);
    setMethod(props.dataCollector.method);
    setHeader(props.dataCollector.header);
    setBody(props.dataCollector.body);
    setId(props.dataCollector.id);
    setDataCollectorEvents(props.dataCollectorEvents);
  };

  // creating a object with all relevant data to update or create a changed dataCollector
  const packDataCollector = () => {
    let back = {
      ...props.dataCollector,
    };
    back.title = title;
    back.endpoint = endpoint;
    back.frequency = frequency;
    back.paused = paused;
    back.method = method;
    back.header = header;
    back.body = body;
    back.id = id;
    back.dataCollectorEvents = dataCollectorEvents;
    return back;
  };

  // triggers when a new dataCollector is given to this component or the new parameter is changed
  useEffect(() => {
    if (!props.new) {
      extractDataCollector();
    }
  }, [props.dataCollector, props.dataCollectorEvents, props.new]);

  useEffect(() => {
    if (props.new) {
      setEditMode(true);
    }
  }, [props.new]);

  // indicates whether the dataCollector can be changed
  const [editMode, setEditMode] = React.useState(null);

  // ----------------------------------------------------------------------------------------------------
  // on change functions

  const onChangeTitle = (value) => {
    setTitle(value);
  };
  const onChangeEndpoint = (value) => {
    setEndpoint(value);
  };
  const onChangeFrequency = (value) => {
    setFrequency(value);
  };
  const onChangeMethod = (value) => {
    setMethod(value);
  };
  const onChangeBody = (value) => {
    setBody(value);
  };
  const onChangeHeader = (value) => {
    setHeader(value);
  };
  const togglePaused = (value) => {
    setPaused(!paused);
  };

  // cancel is called, functionality differs whether it is a new dataCollector or not
  const onCancel = () => {
    if (props.new) {
      props.history.push("/");
    } else {
      setEditMode(false);
      extractDataCollector();
    }
  };

  // save is called, functionality differs whether it is a new dataCollector or not
  const onSave = () => {
    if (props.new) {
      props.onCreate(packDataCollector());
    } else {
      setEditMode(false);
      props.onSave(packDataCollector());
    }
  };

  const onClickRefresh = () => {
    props.onRefresh();
  };

  return (
    <div
      className={
        classes.flexCol +
        " " +
        classes.padding +
        " " +
        classes.center +
        " " +
        classes.flex +
        " " +
        classes.maxWidth
      }
    >
      {/* Admin Buttons */}
      <div
        className={
          classes.flexRow +
          " " +
          classes.flexEnd +
          " " +
          classes.barMinHeight +
          " " +
          classes.marginTop
        }
      >
        {/* Checks if the current user is admin. Only an admin can alter datacollectors */}
        {editMode ? (
          <React.Fragment>
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              className={classes.marginSides}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="contained"
              color="primary"
              className={classes.marginSides}
              disabled={false}
            >
              {props.new ? "Create" : "Save"}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              onClick={onClickRefresh}
              variant="contained"
              color="secondary"
              className={classes.marginSides}
              disabled={!props.isLoggedIn}
            >
              Refresh Data
            </Button>
            <Button
              onClick={(e) => setEditMode(true)}
              variant="contained"
              color="primary"
              className={classes.marginSides}
              disabled={!props.isLoggedIn}
            >
              Edit
            </Button>
          </React.Fragment>
        )}
      </div>
      {editMode ? (
        <div className={`${classes.listRoot} ${classes.alignCenter}`}>
          <Grid>
            <Grid item sm={12} xs={12}>
              <Grid
                container
                spacing={3}
                className={`${classes.roundBox} ${classes.detailsBox} ${classes.paper} ${classes.paddingCreatePage}`}
              >
                <Grid item>
                  <Typography variant="h1" align="left">
                    Data Collector
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h1" align="left">
                    {paused ? (
                      <WarnButton onClick={togglePaused}>paused</WarnButton>
                    ) : (
                      <StatusButton onClick={togglePaused}>active</StatusButton>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.marginTopLarge}>
              <DetailsArea
                title="Data Collector Details"
                content={
                  <DataCollectorCreateForm
                    editMode={editMode}
                    title={title}
                    endpoint={endpoint}
                    frequency={frequency}
                    method={method}
                    body={body}
                    header={header}
                    onChangeTitle={onChangeTitle}
                    onChangeBody={onChangeBody}
                    onChangeHeader={onChangeHeader}
                    onChangeEndpoint={onChangeEndpoint}
                    onChangeFrequency={onChangeFrequency}
                    onChangeMethod={onChangeMethod}
                  />
                }
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        // Data Collector Details Sections
        <div className={`${classes.listRoot} ${classes.alignCenter}`}>
          <Grid
            container
            spacing={3}
            className={`${classes.roundBox} ${classes.borderBox} ${classes.shadow} ${classes.headerBox} ${classes.boxPadding}`}
          >
            <Grid item sm={6} xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" align="left">
                    {title} &nbsp;
                    {paused ? (
                      <WarnButton>paused</WarnButton>
                    ) : (
                      <StatusButton>active</StatusButton>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} className={classes.marginTopLarge}>
                  <RequestButton>{method}</RequestButton>
                  <NeutralButton>
                    {endpoint.length > 60
                      ? endpoint.substr(0, 60) + "..."
                      : endpoint}
                  </NeutralButton>
                </Grid>
                <Grid item xs={12}>
                  <RequestButton>Frequency</RequestButton>
                  <NeutralButton>{frequency}</NeutralButton>
                </Grid>
                {header ? (
                  <Grid item xs={12}>
                    <RequestButton>Header</RequestButton>
                    <NeutralButton>
                      {header.length > 60
                        ? header.substr(0, 60) + "..."
                        : header}
                    </NeutralButton>
                  </Grid>
                ) : null}
                {body ? (
                  <Grid item xs={12}>
                    <RequestButton>Body</RequestButton>
                    <NeutralButton>
                      {body.length > 60 ? body.substr(0, 60) + "..." : body}
                    </NeutralButton>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Grid item sm={3} xs={12}>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Typography variant="h5" align="left">
                    Availability
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <GraphComponent
                    className={classes.graph}
                    data={props.dataCollectorEvents}
                    color={"#333333"}
                    type={"httpAvailability"}
                    height={120}
                    compact={true}
                    alternateKey={"timestamp"}
                    alternateValue={"statusCode"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3} xs={12}>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Typography variant="h5" align="left">
                    Response time
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <GraphComponent
                    className={classes.graph}
                    data={props.dataCollectorEvents}
                    color={"#333333"}
                    type={"area"}
                    height={120}
                    compact={true}
                    alternateKey={"timestamp"}
                    alternateValue={"responseTime"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {props.dataCollectorEvents ? (
            <DataCollectorEventsListComponent
              dataCollectorEvents={props.dataCollectorEvents}
            />
          ) : (
            <p>Object dataCollectorEvents does not exist.</p>
          )}
        </div>
      )}
    </div>
  );
}

// attributes of props and their type
DataCollectorDetailsComponent.propTypes = {
  dataCollector: PropTypes.object,
  dataCollectorEvents: PropTypes.array,
  new: PropTypes.bool,
  onCreate: PropTypes.func,
  onSave: PropTypes.func,
  onRefresh: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(DataCollectorDetailsComponent);
