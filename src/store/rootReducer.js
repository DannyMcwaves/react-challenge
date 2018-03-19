const defaultState = {
  apiResponse: null
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case 'GET_SVG':
      // return the data from the apiMiddleware as the new state.
      return action.data;
    default:
      // defaults to returning the new state.
      return state;
  }
}