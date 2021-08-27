import GraphService from "../../services/GraphService";

export function getGraphs() {
  console.log("getGraphs triggered");
  function onSuccess(graphs) {
    // console.log(graphs);
    return { type: "GETGRAPHS_SUCCESS", graphs: graphs };
  }
  function onFailure(error) {
    console.log("failed to get the graphs", error);
  }

  return async (dispatch) => {
    try {
      let graphs = await GraphService.getGraphs();
      dispatch(onSuccess(graphs));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getGraph = (id) => {
  function onSuccess(graph) {
    return { type: "GETGRAPH_SUCCESS", graph: graph };
  }
  function onFailure(error) {
    console.log("Failed to load the graph", error);
  }

  return async (dispatch, getState) => {
    try {
      let graph = await GraphService.getGraph(id);

      // retrieve data collector for this graph
      // await getDataCollector(graph.datacollector_id);
      dispatch(onSuccess(graph));
    } catch (e) {
      onFailure(e);
    }
  };
};

export function addGraph(graph) {
  function onSuccess(createdGraph) {
    return { type: "ADDGRAPH_SUCCESS", graph: createdGraph };
  }
  function onFailure(error) {
    console.log("Add dashboard failure", error);
    return { type: "ADDGRAPH_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let createdGraph = await GraphService.createGraph(graph);
      let actions = [onSuccess(createdGraph), getGraphs()];
      actions.map((a) => dispatch(a));
      // dispatch(onSuccess(createdGraph));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function changeGraph(graph) {
  function onSuccess(graph) {
    return { type: "UPDATEGRAPH_SUCCESS", graph: graph };
  }

  function onFailure(error) {
    console.log("change graph failure", error);
    return { type: "UPDATEGRAPH_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let updated_graph = await GraphService.updateGraph(graph);
      let actions = [onSuccess(updated_graph), getGraphs()];

      actions.map((a) => dispatch(a));
      // dispatch(onSuccess(updated_graph));
    } catch (e) {
      let error = e;
      if (typeof error === "string") {
        error = {
          code: "UNKNOWN_ERROR",
          title: e,
          details: "Please try again!",
        };
      }
      dispatch(onFailure(error));
    }
  };
}

export function deleteGraph(id) {
  function onSuccess(result) {
    return { type: "DELETEGRAPH_SUCCESS" };
  }
  function onFailure(error) {
    console.log("delete dataCollector failure", error);
  }

  return async (dispatch) => {
    try {
      let result = await GraphService.deleteGraph(id);
      let actions = [onSuccess(result), getGraphs()];

      actions.map((a) => dispatch(a));

      // dispatch(onSuccess(graphs));
    } catch (e) {
      onFailure(e);
    }
  };
}
