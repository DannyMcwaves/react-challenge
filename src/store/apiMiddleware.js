export default function () {
  return next => action => {
    fetch().then(data => next({type: action.type, data: {apiResponse: data}})).catch(err => console.log(err));
  };
}