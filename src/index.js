import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import App from './router/index';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>, document.getElementById('root')
);