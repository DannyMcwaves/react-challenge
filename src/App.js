import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class App extends Component {

  constructor(){
    super();
    this.state = {current: null}
  }

  render() {
    // map through the api response and return a div containing the svg element.
    return (
        <div className="App">
          <div className="logos">
            {this.props.apiResponse && this.props.apiResponse.map((el, index) => (
              <div onClick={() => {this.showColor(index)}} key={index}> {this.state.current === index ? el.props.children.props.fill : el} </div>
            ))}
          </div>
        </div>
    );
  }

  componentDidMount() {
    // dispatch the GET_SVG action when the component mounts.
    this.props.dispatch({type: 'GET_SVG'});
  }

  showColor(e) {
    // set the current state to the index of the svg element.
    this.setState({current: e})
  }

}

// defining propTypes for the app.
App.propTypes = {
  apiResponse: PropTypes.array,
  dispatch: PropTypes.func
};


// set a random color to the svg element.
const randomizeSvgColor = state => {
  let img = state ? state.images : [];
  return img.map(svg => {
    // list of colors to use
    let colors = ['#cc00cc', '#AACB71', '#E9A178', '#29373D', '#62B550', '#7FA842',
      '#ffffff', '#cc3366', '#EE88ff', '#CCD8EE', '#EE8811', '#7e53fd'];
    // clone a new react element from the current g element, setting the new fill color to any random one from above
    let g = React.cloneElement(svg.svg.props.children, {...svg.svg.props.children.props, ...{fill: colors[Math.floor(Math.random() * colors.length)]}}) ;
    // return the new react element.
    return React.cloneElement(svg.svg, {...svg.svg.props, ...{children: g}});
  });
};

// map state from the store to the props of the component
const mapStateToProps = state => ({apiResponse: randomizeSvgColor(state.apiResponse)});

// map dispatch from connect to dispatch prop of component.
const mapDispatchToProps = dispatch => ({dispatch});

// connect the the component to the store.
export default connect(mapStateToProps, mapDispatchToProps)(App);
