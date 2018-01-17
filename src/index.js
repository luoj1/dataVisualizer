
import React,{Component} from 'react';
import {createStore, applyMiddleware,compose} from 'redux';

import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './app/containers/App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import appReducer from './app/reducers'
import { Provider } from 'react-redux'
const loggerMiddleware = createLogger();

export function configurationStore(initialState){
  return createStore(
    appReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      //loggerMiddleware
    )
  )

}
export class Root extends Component {
  render() {
    return (
      <Provider store={configurationStore({})}>
      <AppContainer />
      </Provider>
    )
  }
}

ReactDOM.render(

  <Root />

  ,
  document.getElementById('root'));
registerServiceWorker();
