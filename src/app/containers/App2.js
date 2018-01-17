import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../actions'
import logo from './logo.svg';
import './App.css';
var mqtt = require('mqtt');
var Buffer = require('buffer').Buffer;

class App extends Component {
  constructor(props) {
   super(props)
   var temp = this.props;
  //--------dictionary---------
  var config = {};
  const url = 'https://cors-anywhere.herokuapp.com/'+"http://solarracing.me/api/metrics";
  fetch(url)
  .then(response => response.text())
  .then(
    contents => {
      var cid = [];
      contents= JSON.parse(contents);
      for (var i = 0; i<contents.length;i++){
        var obj = contents[i];
        if(config[obj['CAN_id']]==undefined){
          config[obj['CAN_id']] = [];
          cid.push(obj['CAN_id']);
        }
        config[obj['CAN_id'].toString()].push({name:obj['name'],offset:obj['offset'],datatype:obj['datatype']});
      }
      cid.sort();
      //temp.dict(config);
      console.log(cid);
      console.log('config');
//--------------------
   const client = mqtt.connect();
   client.on('connect', () => {
   console.log('work');
   client.subscribe('telemetry');
   })
   client.on('message', function (topic, message) {
   console.log(message);
   /*var b = Buffer.from(message);
   var string = new TextDecoder("utf-8").decode(message);*/
   if (message.length==16){
  var out = {name:'',value:''};
   var b = Buffer.from(message);
   console.log(b.readUInt32LE(0));
   console.log(b.readUInt16LE(4));
   console.log(b.readUInt16LE(6));
   if(config[b.readUInt16LE(6).toString()]!=undefined){
     let conf=config[b.readUInt16LE(6).toString()];
     var out = {};
     for(var i = 0; i<conf.length;i++) {
       if (conf[i].datatype == 'float32') {
         console.log(conf[i].name);
         console.log(b.readFloatLE(conf[i].offset + 8));
         out['name'] = conf[i].name;
         out['value'] = b.readFloatLE(conf[i].offset + 8);
         temp.updateMsg(out,temp.datalist);
       } else if (conf[i].datatype == 'uint8') {
         console.log(conf[i].name);
         console.log(b.readUInt8(conf[i].offset + 8));
         out['name'] = conf[i].name;
         out['value'] = b.readUInt8(conf[i].offset + 8);
         temp.updateMsg(out,temp.datalist);
       }
     }
   }
 }

   })
 }
)

 }

  process(msg){
return 'processed'+msg;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          123
        </p>
        {this.props.comp}

      </div>
    );
  }


}
function mapStateToProps(state){
  return {
    dict: state.dict,
    comp:state.comp,
    datalist: state.datalist,
  }
}

export default connect (mapStateToProps)(App);
