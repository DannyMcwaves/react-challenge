const defaultState = {
  apiResponse: null
};

export default function(state = defaultState, action) {
  switch(action.type) {
    case 'GET_SVG':
      return {...state, ...action.data};
    default:
      return state;
  }
}