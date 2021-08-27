import React, { useEffect } from "react";
import { Button, Typography, Grid } from "@material-ui/core";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import GraphComponent from "../Graph/GraphComponent";
import GridLayout from "react-grid-layout";

import GraphService from "../../services/GraphService";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { WarnButton } from "../../theming/objects";
import styles from "../../theming/styles";
import CustomAlert from "../General/CustomAlert";

/**
 * For presenting and changing dataCollector details
 * @param {props} props
 */
function DashboardDetailsComponent(props) {
  const classes = styles();
  const history = useHistory();

  const [selectedGraph, setSelectedGraph] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [layout, setLayout] = React.useState([]);
  const [graphs, setGraphs] = React.useState([]);
  const [graphData, setGraphData] = React.useState([]);
  const [dropdownOptions, setDropdownOptions] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);
  const [titleValid, setTitleValid] = React.useState("");

  useEffect(() => {
    // console.log(props.title);
    if (props.new) {
      setEditMode(true);
      // console.log("new dashboard");
    } else {
      setEditMode(false);
    }
    extractDashboard();
    updateDropdownOptions(graphs);
  }, [props.dashboard, props.new]);

  useEffect(() => {
    console.log(graphs);
    if (graphs && graphs.length > 0) {
      updateDropdownOptions(graphs);
    }
  }, [graphs]);

  useEffect(() => {
    console.log(props.selectableGraphs);
    if (props.selectableGraphs && props.selectableGraphs.length > 0) {
      console.log(props.selectableGraphs);
      updateDropdownOptions(graphs);
    }
  }, [props.selectableGraphs]);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      // console.log(graphData[0].graphData);
    }
  }, [graphData]);

  // extract dashboard data for current dashboard
  const extractDashboard = () => {
    setTitle(props.dashboard.title);
    setLayout(props.dashboard.layout);
    setGraphs(props.dashboard.graphs);
    setGraphData(props.dashboard.graphData);
  };

  // store current state in dashboard object
  const packDashboard = () => {
    let back = {
      ...props.dashboard,
    };
    back.title = title;
    back.layout = layout;
    back.graphs = graphs;
    return back;
  };

  const onUpdateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  // every graph can only be once on a dashboard. this function ensures that the
  // dropdown always stays up-to-date
  const updateDropdownOptions = (graphs = []) => {
    // let options = [...dropdownOptions];
    let options = [];
    // console.log(options);
    if (props.selectableGraphs && props.selectableGraphs.length > 0) {
      props.selectableGraphs.map((graph) => {
        // console.log(1);

        options.push({ key: graph._id, text: graph.title, value: graph._id });
      });
    }

    options = options.filter((option) => !graphs.includes(option.key));
    // console.log(options);
    setDropdownOptions(options);
  };

  // update the state of the currently selected graph
  // of the dropdown menu
  const handleOnGraphSelection = (e, data) => {
    // console.log(data);
    setSelectedGraph(data.value);
  };

  const validateTitle = (e) => {
    let value = e.target.value;
    onUpdateTitle(value);
    if (value === "" || value === null) {
      setTitleValid("Please enter a Title that is not empty");
    } else if (value.match("[^A-Za-z]+$")) {
      setTitleValid(
        "Please enter a Title that contains only latters and not ends with a space."
      );
    } else {
      setTitleValid("");
    }
  };

  const addNewGraphToDashboard = async () => {
    // define const for new graph
    let newGraphHeight = 3;
    let newGraphWidth = 3;

    let updatedGraphData = [...graphData];
    let updatedLayout = [...layout];
    let updatedGraphs = [...graphs];

    // retrieve data for selected graph
    let graph = await GraphService.getGraph(selectedGraph);
    // console.log(graph);

    // check if graph already exists in dashboard
    let graphExists = graphData.some((graphD) => graphD._id === graph._id);
    if (graphExists) {
      console.log("Graph already exists in Dashboard");
      return;
    }

    // add id to graphs of dashboard
    updatedGraphs.push(graph._id);

    // update layout
    // find largest y value in layout
    // add new graph below largest y value
    let nextY = 0;
    if (updatedLayout.length > 0) {
      // find max Y value
      let maxYGraph = updatedLayout.reduce(function (prev, current) {
        return prev.y > current.y ? prev : current;
      });
      nextY = maxYGraph.y + newGraphHeight;
    }
    updatedLayout.push({
      i: graph._id,
      x: 0,
      y: nextY > 0 ? nextY : 0,
      w: newGraphWidth > 0 ? newGraphWidth : 6,
      h: newGraphHeight > 0 ? newGraphHeight : 6,
      minW: 3,
      minX: 3,
    });

    // update array of graph data
    updatedGraphData.push(graph);
    setGraphData(updatedGraphData);
    setLayout(updatedLayout);
    setGraphs(updatedGraphs);
  };

  const removeGraphFromDashboard = (graphId) => {
    let updatedGraphData = [...graphData];
    let updatedLayout = [...layout];
    let updatedGraphs = [...graphs];

    // remove graph
    updatedGraphData = updatedGraphData.filter(
      (item) => !(item._id === graphId)
    );

    updatedLayout = updatedLayout.filter((item) => !(item.i === graphId));

    updatedGraphs = updatedGraphs.filter((item) => !(item === graphId));

    setGraphData(updatedGraphData);
    setLayout(updatedLayout);
    setGraphs(updatedGraphs);
  };

  const onSave = () => {
    if (props.new) {
      setEditMode(false);
      props.onCreate(packDashboard());
    } else {
      setEditMode(false);
      props.onSave(packDashboard());
    }
  };

  const onCancel = () => {
    if (props.new) {
      history.push("/creations");
    } else {
      setEditMode(false);
      extractDashboard();
    }
  };

  const onWarningClickCreateGraph = () => {
    props.history.push("/graph/new");
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
      {!props.selectableGraphs ? (
        <Grid item xs={12} sm={12}>
          <CustomAlert
            title={"No Graphs found!"}
            details={
              "Dashboards consist of previously defined Graphs. In order to create a dashboard, please create a Graph first"
            }
            buttonTitle={"Create new Graph"}
            onClick={onWarningClickCreateGraph}
            onDismissWarning={props.onDismissWarning}
          />
        </Grid>
      ) : null}
      <div
        className={
          classes.flexRow + " " + classes.flexEnd + " " + classes.barMinHeight
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

      <div>
        {editMode ? (
          <Grid container>
            <Grid item sm={4} xs={12}>
              <input
                type="text"
                className={classes.inputField}
                placeholder="Enter a Title"
                defaultValue={title}
                onChange={(e) => {
                  validateTitle(e);
                }}
              />
              {titleValid != "" ? (
                <WarnButton className={classes.inputWarning}>
                  {titleValid}
                </WarnButton>
              ) : null}
            </Grid>
            <Grid item sm={2} xs={12}></Grid>
            <Grid item sm={5} xs={12}>
              <Dropdown
                placeholder="Select a graph to add"
                fluid
                selection
                options={dropdownOptions}
                onChange={handleOnGraphSelection}
                value={props.channel}
                className={classes.dropdown}
              />
            </Grid>
            <Grid item sm={1} xs={12}>
              <Button
                onClick={addNewGraphToDashboard}
                variant="contained"
                color="primary"
                disabled={selectedGraph ? false : true}
                style={{ marginLeft: "10px", height: "55px" }}
              >
                Add Graph
              </Button>
            </Grid>
          </Grid>
        ) : (
          <h1>{title}</h1>
        )}

        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1200}
          height={1000}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
          isDraggable={editMode}
          isResizable={editMode}
        >
          {/* only show graphs if they exist in the dataset */}
          {graphData && graphData.length > 0
            ? graphData.map((graphData) => (
                <div
                  key={graphData._id}
                  className={`${classes.flexCol} ${classes.graphPadding} ${classes.roundBox} ${classes.borderBox} ${classes.shadow}`}
                >
                  {editMode ? (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeGraphFromDashboard(graphData._id);
                      }}
                      className={`${classes.flexRow} ${classes.flexEnd} ${classes.barMinHeight}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null}
                  <Typography
                    variant="h4"
                    align="left"
                    className={classes.graphTitle}
                  >
                    {graphData.title}
                  </Typography>
                  <GraphComponent
                    className={classes.graph}
                    data={graphData.graphData}
                    title={graphData.title}
                    label={graphData.yAxisTitle}
                    color={graphData.color}
                    type={graphData.type}
                    // height={500}
                  />
                </div>
              ))
            : null}

          {/* Add new Graph to Dashboard */}
        </GridLayout>
      </div>
    </div>
  );
}

// attributes of props and their type
DashboardDetailsComponent.propTypes = {
  dashboard: PropTypes.object,
  selectableGraphs: PropTypes.array,
  new: PropTypes.bool,
  onCreate: PropTypes.func,
  onSave: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(DashboardDetailsComponent);
