import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from 'actions/simpleAction';

class App extends Component {

  simpleAction = () => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <button variant="contained" color="primary">
          Hello World
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
