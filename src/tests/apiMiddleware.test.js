import React from 'react';
import apiMiddleware from '../store/apiMiddleware';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../store/rootReducer';
import fetch from '../api/mockFetch';

window.fetch = fetch;

describe('++ apiMiddleware Unit tests', () => {
  let state = {apiResponse: null},
    store,
    spy,
    get_svg = () => ({type: 'GET_SVG'});

  beforeEach(() => {
    spy = jest.fn(apiMiddleware);
    store = createStore(reducer, state, applyMiddleware(spy));
  });

  it('get the current state to equal to the initial state', () => {
    expect(store.getState()).toEqual(state);
  });

  it('should dispatch expected get_svg action and expect new state to match fetch object', () => {
    store.dispatch(get_svg());

    store.subscribe(() => {
      expect(fetch()).resolves.toMatchObject(store.getState()['apiResponse']);
    });

  });

  it('expect the apiMiddleware to have been called during dispatch', () => {
    expect(spy).toBeCalled();
  });

  it('direct tests the middleware by passing action and next function', () => {
    apiMiddleware()(obj => expect(fetch()).resolves.toEqual(obj.data.apiResponse) )({type: 'GET_SVG'});
  })

});