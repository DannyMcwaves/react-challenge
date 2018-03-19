export default function () {
  return next => action => {
    // fetch the data from the mockFetch function  and call the next function that dispatches the main action
    // to the reducer which in turn updates the store/state.
    fetch().then(data => next({type: action.type, data: {apiResponse: data}})).catch(err => console.log(err));
  };
}