import React from 'react';
import { Route, Redirect } from 'react-router';
import { notification } from 'antd';
import { isLoggedIn, isBillingEnabled, loadProfile, getProfileBillingAccounts } from './operations/userManagement';
import store from './store';
import history from "./history";
import { loadBillingAccounts } from './operations/billingAccount';
import { increment, decrement, set, get } from 'automate-redux';

const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function incrementPendingRequests() {
  store.dispatch(increment("pendingRequests"))
}

export function decrementPendingRequests() {
  store.dispatch(decrement("pendingRequests"))
}

export function markSetupComplete() {
  store.dispatch(set("setupComplete", true))
}

export function isSetupComplete(state) {
  return get(state, "setupComplete", false)
}

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: String(msg), duration: type === 'error' ? 0 : duration });
}

export function capitalizeFirstCharacter(str) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getCurrencyNotation = (currency) => {
  switch (currency.toLowerCase()) {
    case "inr":
      return "₹"
    default:
      return "$"
  }
}

export function formatDate(dateString) {
  if (!dateString) return dateString
  const date = new Date(dateString)
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const monthText = months[month]
  return `${monthText} ${day}, ${year}`
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
export function openBillingAccount(billingId) {
  // If no billing id is specified use the last opened billing id
  if (!billingId) {
    billingId = getLastOpenedBillingAccount()
  }

  const billingAccounts = getProfileBillingAccounts(store.getState())

  if (!billingId) {
    // Return if no billing accounts present in the profile
    if (!billingAccounts || !billingAccounts.length) {
      return
    }

    // Use the first billing account from the profile if no billing id specified
    // or if the specified billing id is no more present in the user's profile
    if (billingAccounts.findIndex(obj => obj.id === billingId) === -1) {
      billingId = billingAccounts[0].id
    }
  }
  
  const pathName = window.location.pathname
  const pathArray = pathName.split("/")
  const currentSelectedBillingId = pathArray[2]

  // Return if the billing id to be opened is already opened
  if (billingId === currentSelectedBillingId) {
    return
  }

  store.dispatch(set("invoices", []))

  // Form the new path to be opened.
  // This path should have the same url with the the only billing id changed if the previous path was a billing path.
  // Or else this path should just open the home page of a billing account
  const isCurrentPathABillingPath = pathName.startsWith("/billing")
  let newPath = `/billing/${billingId}`
  if (isCurrentPathABillingPath) {
    pathArray[2] = billingId
    newPath = pathArray.join("/")
  }

  history.push(newPath)

  // Save the billing id in local storage 
  setLastOpenedBillingAccount(billingId)
}

export function performOnTokenActions() {
  return new Promise((resolve, reject) => {
    loadProfile()
      .then(() => {
        const billingEnabled = isBillingEnabled(store.getState())
        if (!billingEnabled) {
          history.push("/enable-billing")
          resolve()
          return
        }

        // Opens last opened billing account. If no account opened yet, then opens the first account 
        openBillingAccount()

        // Load information about all the billing accounts in background
        loadBillingAccounts()

        resolve()
      })
      .catch(ex => reject(ex))
  })
}

export function performOnAppLoadActions() {
  return new Promise((resolve, reject) => {
    const loggedIn = isLoggedIn()
    const pathname = window.location.pathname
    if (!loggedIn && pathname.startsWith("/billing")) {
      history.push("/signup")
      resolve()
      return
    }
    if (loggedIn) {
      performOnTokenActions()
        .then(() => resolve())
        .catch((ex) => {
          console.log("Error loading profile", ex)
          history.push("/signup")
          reject(ex)
        })
      return
    }
    resolve()
  })
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
        !isBillingEnabled(store.getState()) ? (
          <Redirect to='/enable-billing' />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}
