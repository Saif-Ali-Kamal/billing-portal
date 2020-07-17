import React from 'react';
import Routes from './Routes';
import { Spin } from "antd"
import './App.css';
import './App.less';
import { useSelector } from 'react-redux';

function App() {
  const pendingRequests = useSelector(state => state.pendingRequests)
  const loading = pendingRequests > 0 ? true : false
  return (
    <React.Fragment>
      {loading && <Spin spinning={true} size="large" />}
      <Routes />
    </React.Fragment>
  );
}

export default App;
