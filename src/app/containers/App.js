import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../actions'
import logo from './logo.svg';
import './App.css';
import App from './App2'


class AppContainer extends Component {
  render() {
    return   <App {...this.props} />
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch);
}
export default connect ((state)=>{return{

}
},mapDispatchToProps)(AppContainer);


//export default App;
