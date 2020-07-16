import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import history from './history';

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: msg.toString(), duration: duration });
}

export function getToken() {
  return localStorage.getItem("token")
}

  const token = getToken()

export const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Redirect to='/signin' />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}
