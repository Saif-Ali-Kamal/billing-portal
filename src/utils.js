import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import { isLoggedIn, isBillingEnabled, loadProfile, getProfileBillingAccounts } from './operations/userManagement';
import store from './store';
import history from "./history";
import { loadBillingAccounts } from './operations/billingAccount';

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: msg.toString(), duration: duration });
}

export function capitalizeFirstCharacter(str) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getToken() {
  return localStorage.getItem("token")
}
export function saveToken(token) {
  localStorage.setItem("token", token)
}

export function getLastOpenedBillingAccount() {
  return localStorage.getItem("lastOpenedBillingAccount")
}

export function setLastOpenedBillingAccount(billingId) {
  localStorage.setItem("lastOpenedBillingAccount", billingId)
}

// Opens a specified billing account
// If no account is specified then in opens the last opened billing account
// It also saves the opened tab as last opened tab in the local storage
export function openBillingAccount() {
  let billingId = getLastOpenedBillingAccount()

  const billingAccounts = getProfileBillingAccounts(store.getState())

  // Use the first billing account from the profile if no information about last billing account opened
  // or if the last billing account opened is no more present in the user's profile
  if (!billingId || billingAccounts.findIndex(obj => obj.id === billingId) === -1) {
    billingId = billingAccounts[0].id
  }

  history.push(`/billing/${billingId}`)
}

export function performOnTokenActions() {
  loadProfile()
    .then(() => {
      const billingEnabled = isBillingEnabled()
      if (!billingEnabled) {
        history.push("/enable-billing")
        return
      }

      // Opens last opened billing account. If no account opened yet, then opens the first account 
      openBillingAccount()

      // Load information about all the billing accounts in background
      loadBillingAccounts()
    })
}

export function performOnAppLoadActions() {
  const loggedIn = isLoggedIn()
  const pathname = window.location.pathname
  if (!loggedIn && pathname.startsWith("/billing")) {
    history.push("/signup")
    return
  }

  performOnTokenActions()
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn() ? (
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
        !isBillingEnabled() ? (
          <Redirect to='/enable-billing' />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}
