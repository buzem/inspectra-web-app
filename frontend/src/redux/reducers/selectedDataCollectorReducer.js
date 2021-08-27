export default function selectedDataCollector(state = {}, action) {
  switch (action.type) {
    case "GETCOLLECTOR_SUCCESS":
      return {
        dataCollector: action.dataCollector,
        dataCollectorEvents: action.dataCollectorEvents,
      };
    case "GETCOLLECTOR_ERROR":
      return { error: action.error };
    case "ADDCOLLECTOR_SUCCESS":
      return {
        dataCollector: action.dataCollector,
      };
    case "CHANGE_SELECTED_COLLECTOR":
      return {
        dataCollector: {
          ...state.dataCollector,
          ...action.updates,
        },
        dataCollectorEvents: action.dataCollectorEvents,
      };
    default:
      return state;
  }
}
