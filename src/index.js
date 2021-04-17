import React from 'react';
import ReactDOM from 'react-dom';
import RouteMap from './router/RouteMap'
import { Provider } from 'react-redux'
import store from './redux/index'
import './styles/index.scss'
// 引入rem基准值
import 'lib-flexible'

ReactDOM.render(
  <Provider store={store}>
    <RouteMap />
  </Provider>,
  document.getElementById('root')
);

