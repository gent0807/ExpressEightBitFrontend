import React from 'react';
import ReactDOM from 'react-dom';
import "./Item/fonts/font.css";
import Main from './Main';
import styled from 'styled-components';
import { Provider } from "react-redux";
import store from './Redux/Store'
import { RecoilRoot } from 'recoil';

/* const reducer = (currentState, action) => {
    if(currentState===undefined){
      return {
        token: null,
      }
    }
    let newState={...currentState};
    if(action.type==='LOGIN'){
      newState.token=action.token;
    }
    return newState;
};

const store = createStore(reducer); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
      <Provider store={store}>
          <Main />
      </Provider>
    </RecoilRoot>
);


