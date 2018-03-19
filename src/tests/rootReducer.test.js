import React from 'react';
import {createStore} from 'redux';
import rootReducer from '../store/rootReducer';

describe('++ apiMiddleware Unit tests', () => {
  let state = {apiResponse: {images: []}},
    store,
    spy;

  beforeEach(() => {
    spy = jest.fn(rootReducer);
    store = createStore(spy, state);
  });

  it('get the current state to equal to the initial state', () => {
    expect(store.getState()).toEqual(state);
  });

  it('should expect dispatch to root reducer to return action data', () => {
    let data = {images: [{svg: 'this is an svg element'}]};

    store.dispatch({type: 'GET_SVG'});

    store.subscribe(() => {
      expect(data).toMatchObject(store.getState()['apiResponse']);
    });

  });

  it('expect the apiMiddleware to have been called', () => {
    expect(spy).toBeCalled();
  });

  it('expects root reducer to return action data when type is GET_SVG', () => {
    let data = {images: []};
    expect(rootReducer({}, {type: 'GET_SVG', data})).toEqual(data);
  });

  it('expects root reducer to return default state of the of the app when no type is specified', () => {
    expect(rootReducer(undefined, {type: 'PASS'})).toMatchObject({apiResponse: null});
  })

});