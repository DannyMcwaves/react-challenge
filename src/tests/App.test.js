import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {Provider} from 'react-redux';
import configStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



Enzyme.configure({ adapter: new Adapter() });

import {mount} from 'enzyme';


// show us some tests for your solution!

it('renders without crashing', () => {

  // a simple redux store for connecting to component.
  let store = configStore()({apiResponse: null});

  const div = document.createElement('div');
  ReactDOM.render( <Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('++ App tests', () => {

  let wrapper,
    store = configStore()({apiResponse: null});

  beforeEach(() => {
    wrapper = mount(<Provider store={store}><App /></Provider>);
  });

  it('wrapper should have one top component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should find top level component with class App', () => {
    expect(wrapper.find('div.App')).not.toBeNull();
  });

  it('expect the topmost component to be Provider', () => {
    expect(wrapper.name()).toBe('Provider');
  });

  it('should set wrapper prop and try to match it', () => {
    let data = {apiResponse: [<svg>component</svg>, <svg>component</svg>]};
    expect(wrapper.setProps(data).prop('apiResponse')).toMatchObject(data.apiResponse);
  });

  it('should set inner state of wrapper', () => {
    wrapper.setState({current: 2}, () => {
      expect(wrapper.state()).toEqual({current: 2});
    });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

});