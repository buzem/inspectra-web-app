import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import {
  getGraph,
  changeGraph,
  addGraph,
  getDataCollectors,
  getFieldSchemas,
  dismissWarning,
} from "../redux/actions";
import GraphDetailsComponent from "../components/Graph/GraphDetailsComponent";




/**
 * Manages the process of getting Graph details data
 * @param {props} props
 */
function GraphView(props) {
  // props can be deconstructed into single variables, so you do not need to write "props." all the time
  let { match } = props;


  // from redux store
  const user = useSelector((state) => state.user);
  const selectedGraph = useSelector((state) => state.selectedGraph);
  const dataCollectors = useSelector((state) => state.entities.datacollectors);
  const [newGraph, setNewGraph] = React.useState(false);

  const defaultNewGraph = {
    title: "My awesome new graph",
    color: "#7578CE",
    dataCollectorId: "",
    type: "bar",
    path: "",
    yAxisTitle: "",
  };


  useEffect(() => {
    // get id of dataCollector from URL
    let graphId = match.params.id;

    // check if a new dataCollector is created
    if (graphId === "new") {
      // procedd with an empty element
      setNewGraph(true);
    } else {
      // trigger dataCollector load from backend
      loadGraph(graphId);
    }

    if (!dataCollectors) {
      loadDataCollectors();
    }
  }, []);

  const loadDataCollectors = async () => {
    props.dispatch(getDataCollectors());
  };

  const loadGraph = async (graphId) => {
    props.dispatch(getGraph(graphId));
  };

  // for saving an existing graph
  const onSave = (graph) => {
    props.dispatch(changeGraph(graph));
  };

  // for creating a new graph
  const onCreate = (graph) => {
    // trigger redux action add graph
    props.dispatch(addGraph(graph));
    setNewGraph(false);
  };

  const retrieveSchema = (dataCollectorId) => {
    props.dispatch(getFieldSchemas(dataCollectorId));
  };

  const onDismissWarning = () => {
    props.dispatch(dismissWarning());
  };

  return newGraph ? (
    <GraphDetailsComponent
      key={"NewGraph"}
      graph={defaultNewGraph}
      dataCollectors={dataCollectors}
      retrieveSchema={retrieveSchema}
      onDismissWarning={onDismissWarning}
      new={true}
      onCreate={onCreate}
      isLoggedIn={!!user.user}
    />
  ) : selectedGraph.graph ? (
    <GraphDetailsComponent
      key={selectedGraph.graph._id}
      graph={selectedGraph.graph}
      retrieveSchema={retrieveSchema}
      dataCollectors={dataCollectors}
      onDismissWarning={onDismissWarning}
      new={false}
      onSave={onSave}
      isLoggedIn={!!user.user}
    />
  ) : (
    <div>error</div>
  );
}

export default connect()(GraphView);
