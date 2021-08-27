export default function selectedGraph(state = {}, action) {
  switch (action.type) {
    case "GETGRAPH_SUCCESS":
      return {
        graph: action.graph,
      };
    case "ADDGRAPH_SUCCESS":
      return { graph: action.graph };
    case "UPDATEGRAPH_ERROR":
      return { ...state, error: action.error };
    case "UPDATEGRAPH_SUCCESS":
      return { graph: action.graph };

    case "CHANGE":
      return {
        graph: {
          ...state.graph,
          ...action.updates,
        },
      };
    case "DISMISS_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
