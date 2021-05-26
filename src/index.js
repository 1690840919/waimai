import React from 'react';
import ReactDOM from 'react-dom';
import RouteMap from './router/RouteMap'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/index'
import './styles/index.scss'
// 引入rem基准值
import 'lib-flexible'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteMap />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

