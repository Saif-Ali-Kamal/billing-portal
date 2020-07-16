import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import { isLoggedIn, isBillingEnabled } from './operations/userManagement';

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: msg.toString(), duration: duration });
}

export function getToken() {
  return localStorage.getItem("token")
}
export function saveToken(token) {
  localStorage.setItem("token", token)
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Redirect to='/signup' />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}

export const BillingRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isBillingEnabled() ? (
          <Redirect to='/enable-billing' />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}
