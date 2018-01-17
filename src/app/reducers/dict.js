import * as types from '../actions/types'
import createReducer from '../lib/createReducers'
import React from 'react';



export const dict = createReducer(0,{
  [types.DICT](state,action){
    return action.stuff || state;
  }
}
);

export const comp = createReducer(<div className='container' id='place'><div id='code'> </div><p>welcome</p></div>,{

  [types.DICT](state,action){
      document.getElementById('code').innerHTML='<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';
    console.log();
    if(action.list[action.stuff.name]==undefined){
    let workspace = document.createElement('p');
    workspace.id = action.stuff.name;
    workspace.className = 'panel panel-default';
    workspace.innerHTML =action.stuff.name +': '+action.stuff.value;
    workspace.style= "color:red;";
    document.getElementById('place').appendChild(workspace );
  }else{
    document.getElementById(action.stuff.name).innerHTML=action.stuff.name +': '+action.stuff.value;;
  }
    let out = state;
    return out || state;
  }
}
);

export const datalist = createReducer({ind:1},{
  [types.DICT](state,action){
    state[action.stuff.name] = action.stuff.value;
    console.log(state);
    return state;
  }
}
);
