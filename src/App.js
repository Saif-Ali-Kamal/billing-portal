import React from 'react';
import Routes from './Routes';
import { Spin } from "antd"
import './App.css';
import './App.less';
import { useSelector } from 'react-redux';
import { isSetupComplete } from './utils';
import Home from "./pages/home/Home";

function App() {
  const pendingRequests = useSelector(state => state.pendingRequests)
  const loading = pendingRequests > 0 ? true : false
  const setupComplete = useSelector(state => isSetupComplete(state))
  return (
    <React.Fragment>
      {loading && <Spin spinning={true} size="large" />}
      {!setupComplete && <Home />}
      {setupComplete && <Routes />}
    </React.Fragment>
  );
}

export default App;
