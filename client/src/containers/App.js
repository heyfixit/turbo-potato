import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from 'actions/simpleAction';
import Button from '@material-ui/core/Button';
import 'containers/App.css';

class App extends Component {

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
