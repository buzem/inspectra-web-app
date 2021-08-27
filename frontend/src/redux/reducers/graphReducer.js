export default function graphs(state = {}, action) {
  switch (action.type) {
    case "GETGRAPHS_SUCCESS":
      return { graphs: action.graphs };
    default:
      return state;
  }
}
