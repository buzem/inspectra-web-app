import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import GraphComponent from "../Graph/GraphComponent";
import { useSelector } from "react-redux";
import GraphCreateForm from "../Graph/GraphCreateForm";
import DetailsArea from "../General/DetailsArea";
import DataCollectorService from "../../services/DataCollectorService";

import CustomAlert from "../General/CustomAlert";
import FormHelperServices from "../../services/FormHelperService";

import {
  RequestButton,
  NeutralButton,
} from "../../theming/objects";
import styles from "../../theming/styles";

/**
 * For presenting and changing dataCollector details
 * @param {props} props
 */

function GraphDetailsComponent(props) {
  // load styles
  const classes = styles();

  // subscribe to updates of fieldSchemas (schema fields of selected data collector)
  const fieldSchemas = useSelector((state) => state.fieldSchemas);
  const selectedGraph = useSelector((state) => state.selectedGraph);

  // ---------------------------------------------------------------------
  // STATE UPDATE FUNCTIONS
  const [graphTitle, setGraphTitle] = React.useState("New Graph");
  const [graphYAxisTitle, setGraphYAxisTitle] = React.useState("");
  const [dataPath, setDataPath] = React.useState("");
  const [graphType, setGraphType] = React.useState("bar");
  const [graphColor, setGraphColor] = React.useState("#7578CE");
  const [graphData, setGraphData] = React.useState([]);
  const [editMode, setEditMode] = React.useState(null);
  const [dataCollectorDropdownOptions, setDataCollectorDropdownOptions] =
    React.useState([]);
  const [schemaDropdownOptions, setSchemaDropdownOptions] = React.useState([]);
  const [selectedDataCollectorId, setSelectedDataCollectorId] =
    React.useState(null);
  const [graphValid, setGraphValid] = React.useState(false);

  // ---------------------------------------------------------------------
  // USE EFFECT HOOKS

  useEffect(() => {
    console.log(selectedGraph);
  }, [selectedGraph]);

  // triggers when a new graph should be created, or when a graph is passed via the props
  useEffect(() => {
    // if a new graph is created, the edit mode should by default be enabled
    if (props.new) {
      setEditMode(true);
    }

    // if a graph is passed to this component, it will be parsed
    if (props.graph) {
      extractGraph();
    }
  }, [props.graph, props.new]);

  // update list of datacollectors whenever props.datacollector updates
  useEffect(() => {
    console.log(props.dataCollectors);
    // translate list of data collectors from state into dropdown options
    let dataCollectorDropdownOptions =
      FormHelperServices.updateDataCollectorDropdown(props.dataCollectors);
    setDataCollectorDropdownOptions(dataCollectorDropdownOptions);
  }, [props.dataCollectors]);

  // triggers when fieldSchemas is updated
  // translates fieldSchemas into dropdown options for the selection of the right path
  useEffect(() => {
    updateSchemaDropdown();
  }, [fieldSchemas]);

  // triggers when graphPath gets updated
  useEffect(() => {
    if (dataPath !== "" && selectedDataCollectorId) {
      updateGraphData();
    }
  }, [dataPath]);

  // triggers when a dataCollectorID gets selected
  useEffect(() => {
    if (selectedDataCollectorId) {
      // reset schema dropdown
      setSchemaDropdownOptions([]);
      // load schema for selected data collector id
      retrieveSchema(selectedDataCollectorId);
    }
  }, [selectedDataCollectorId]);

  // ---------------------------------------------------------------------
  // functions

  // for extracting the attributes of the given dataCollector to the approriate state variables
  const extractGraph = () => {
    // console.log(props.graph);
    if (!props.graph) {
      return;
    }
    setGraphTitle(props.graph.title);
    setGraphYAxisTitle(props.graph.yAxisTitle);
    setDataPath(props.graph.path);
    setGraphType(props.graph.type);
    setGraphColor(props.graph.color);
    setSelectedDataCollectorId(props.graph.dataCollectorId);
  };

  // creating a object with all relevant data to update or create a changed graph
  const packGraph = () => {
    let back = {
      ...props.graph,
    };
    back.title = graphTitle;
    back.yAxisTitle = graphYAxisTitle;
    back.path = dataPath;
    back.type = graphType;
    back.color = graphColor;
    back.dataCollectorId = selectedDataCollectorId;

    return back;
  };

  // retrieves data schema for current data collector
  const retrieveSchema = () => {
    props.retrieveSchema(selectedDataCollectorId);
  };

  // refreshes data shown in Graph
  const updateGraphData = async () => {
    let data = [...graphData];
    data = await DataCollectorService.getDataCollectorEventData(
      selectedDataCollectorId,
      dataPath
    );
    setGraphData(data);
  };

  // refreshes the dropdown options for the schema dropdown
  const updateSchemaDropdown = async () => {
    if (fieldSchemas.error) {
      setSchemaDropdownOptions([]);
      return;
    }
    let options = FormHelperServices.updateSchemaDropdown(
      fieldSchemas.fieldSchemas
    );
    setSchemaDropdownOptions(options);
  };

  // function that handles a change of the data collector
  const handleOnDataCollectorSelection = (e, data) => {
    setSelectedDataCollectorId(data.value);
    setDataPath(null);
    updateSchemaDropdown([]);
  };

  // function that handles updates to the graphpath
  const updateGraphPath = (e, data) => {
    setDataPath(data.value);
    setGraphYAxisTitle(data.value);
  };

  // function that handles updates to the yAxisTitle
  const onChangeYAxisTitle = async (yAxisTitle) => {
    setGraphYAxisTitle(yAxisTitle);
  };

  // function that handles updates to the graphTitle
  const onChangeTitle = (value) => {
    setGraphTitle(value);
  };

  // function that handles updates to the color
  const onChangeColor = (value) => {
    setGraphColor(value);
  };

  // function that handles updates to the graphType
  const onChangeGraphType = (e, data) => {
    setGraphType(data.value);
  };

  // function that handles updates to the graphData
  const onChangeData = (value) => {
    setGraphData(value);
  };

  // function that handles the onClick event for the warning button
  const onWarningClickInspectDataCollector = () => {
    console.log("error of collector: ", fieldSchemas.error.dataCollectorId);
    props.history.push("/data-collector/" + fieldSchemas.error.dataCollectorId);
  };

  const onWarningClickCreateDataCollector = () => {
    props.history.push("/data-collector/new");
  };

  // function that handles saving/ creating a graph from the attributes from state
  const onSave = () => {
    if (props.new) {

      // console.log(result);
      props.onCreate(packGraph());
      setEditMode(false);
    } else {
      setEditMode(false);
      props.onSave(packGraph());
    }
  };

  // handels cancel button click depending on if it is a new graph or not
  const onCancel = () => {
    if (props.new) {
      props.history.push("/creations");
    } else {
      setEditMode(false);
      extractGraph();
    }
  };

  // ---------------------------------------------------------------------
  // UI

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
      <div
        className={
          classes.flexRow + " " + classes.flexEnd + " " + classes.barMinHeight + " " + classes.marginTopSmall
        }
      >
        {/* Checks if edit mode is enabled */}
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
              disabled={!graphValid}
            >
              {props.new ? "Create" : "Save"}
            </Button>
          </React.Fragment>
        ) : (
          <Button
            onClick={(e) => setEditMode(true)}
            variant="contained"
            color="primary"
            className={classes.marginSides}
            disabled={!props.isLoggedIn}
          >
            Edit
          </Button>
        )}
      </div>

      <Grid container spacing={3}>
        {props.dataCollectors &&
          selectedDataCollectorId && fieldSchemas.error ? (
          <Grid item xs={12} sm={12}>
            <CustomAlert
              title={fieldSchemas.error.title}
              details={fieldSchemas.error.details}
              buttonTitle={"Inspect DataCollector"}
              onClick={onWarningClickInspectDataCollector}
              onDismissWarning={props.onDismissWarning}
            />
          </Grid>
        ) : null}
        {selectedGraph.error ? (
          <Grid item xs={12} sm={12}>
            <CustomAlert
              title={selectedGraph.error.title}
              details={selectedGraph.error.details}
              // buttonTitle={"Inspect DataCollector"}
              // onClick={onWarningClick}
              onDismissWarning={props.onDismissWarning}
            />
          </Grid>
        ) : null}
        {!props.dataCollectors || props.dataCollectors?.length === 0 ? (
          <Grid item xs={12} sm={12}>
            <CustomAlert
              title={"No DataCollectors found!"}
              details={
                "Graphs can only be edited if data collectors are available. Before creating or editing a graph, please ensure that at least one data collector is available."
              }
              buttonTitle={"Create new Data Collector"}
              onClick={onWarningClickCreateDataCollector}
              onDismissWarning={props.onDismissWarning}
            />
          </Grid>
        ) : null}
        <div className={`${classes.listRoot} ${classes.alignCenter} ${classes.marginTopSmall}`}>
        <Grid
          container
          spacing={3}
          className={`${classes.roundBox} ${classes.detailsBox} ${classes.paper} ${classes.paddingCreatePage}`}
        >
          <Grid item>
            <Typography variant="h1" align="left">
              Graph Details
            </Typography>
          </Grid>
        </Grid>
        </div>
        <Grid item xs={12} sm={5}>
          {editMode ? (
            <DetailsArea
              title="Settings"
              content={
                <GraphCreateForm
                  dataCollectorDropdownOptions={dataCollectorDropdownOptions}
                  graphTitle={graphTitle}
                  graphColor={graphColor}
                  graphData={props.graphData}
                  graphType={graphType}
                  dataPath={dataPath}
                  schemaDropdownOptions={schemaDropdownOptions}
                  yAxisTitle={graphYAxisTitle}
                  dataCollector={selectedDataCollectorId}
                  updateDataCollectorSchema={retrieveSchema}
                  onDataCollectorSelection={handleOnDataCollectorSelection}
                  updateGraphPath={updateGraphPath}
                  onChangeGraphType={onChangeGraphType}
                  onChangeYAxisTitle={onChangeYAxisTitle}
                  onChangeTitle={onChangeTitle}
                  onChangeColor={onChangeColor}
                  onChangeData={onChangeData}
                  setGraphValid={setGraphValid}
                />
              }
            />
          ) : (
            <DetailsArea
              title="Details"
              content={
                <div>
                  <Grid item xs={12} className={classes.marginTopLarge}>
                    <RequestButton>Title</RequestButton>
                    <NeutralButton>{graphTitle}</NeutralButton>
                  </Grid>
                  <Grid item xs={12}>
                    <RequestButton>Value</RequestButton>
                    <NeutralButton>{dataPath}</NeutralButton>
                  </Grid>
                  <Grid item xs={12}>
                    <RequestButton>Graph</RequestButton>
                    <NeutralButton>{graphType}</NeutralButton>
                  </Grid>
                  <Grid item xs={12}>
                    <RequestButton>Axis Title</RequestButton>
                    <NeutralButton>{graphYAxisTitle}</NeutralButton>
                  </Grid>
                </div>
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={7}>
          <DetailsArea
            title={graphTitle}
            content={
              <GraphComponent
                className={classes.graph}
                data={graphData}
                title={graphTitle}
                label={graphYAxisTitle}
                color={graphColor}
                type={graphType}
                height={500}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid container></Grid>
    </div>
  );
}

// attributes of props and their type
GraphDetailsComponent.propTypes = {
  graph: PropTypes.object,
  dataCollector: PropTypes.object,
  dataCollectors: PropTypes.array,
  new: PropTypes.bool,
  onCreate: PropTypes.func,
  onSave: PropTypes.func,
  onRetrieveSchema: PropTypes.func,
  onDismissWarning: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(GraphDetailsComponent);
