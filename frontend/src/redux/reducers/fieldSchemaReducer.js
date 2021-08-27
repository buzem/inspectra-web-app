export default function fieldSchemas(state = {}, action) {
  //   console.log(state);
  switch (action.type) {
    case "GETFIELDSCHEMAS_SUCCESS":
      return { fieldSchemas: action.fieldSchemas, error: null };
    case "GETFIELDSCHEMAS_ERROR":
      return {
        ...state,
        error: action.error,
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
