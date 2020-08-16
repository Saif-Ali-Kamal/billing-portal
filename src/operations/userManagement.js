import client from '../client';
import store from "../store"
import { set, get } from 'automate-redux';
import { getToken, saveToken } from "../utils";

export function signup(name, organizationName, email, password) {
  return new Promise((resolve, reject) => {
    client.userManagement.fetchIpAddress()
      .then(({ sourceIp, countryCode }) => {
        client.userManagement.signUp(name, organizationName, email, password, sourceIp, countryCode)
        .then((token) => {
          // Save the token for future use 
          saveToken(token)
  
          // Set the profile, so that it can be visible in the topbar
          const profile = { name, encrypted_email: email, creation_date: new Date().toDateString() }
          setProfile(profile)
  
          resolve()
        }).catch(error => reject(error))
      })
      .catch(ex => {
        reject("Error initiating signup request")
        console.log("Error initiating signup request", ex)
      })
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    client.userManagement.login(email, password)
      .then((token) => {
        // Save the token for future use 
        saveToken(token)

        resolve()
      }).catch(error => reject(error))
  });
}

export function loadProfile() {
  return new Promise((resolve, reject) => {
    client.userManagement.fetchProfile()
      .then((profile) => {
        setProfile(profile)
        resolve()
      }).catch(error => {
        localStorage.clear();
        reject(error)
      })
  });
}

export function sendForgotPasswordEmail(email) {
  return new Promise((resolve, reject) => {
    client.userManagement.forgotPasswordGenerateCode(email)
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

export function resetPassword(verificationCode, password) {
  return new Promise((resolve, reject) => {
    client.userManagement.forgotPasswordVerifyCode(verificationCode, password)
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

export function changePassword(oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    client.userManagement.changePassword(oldPassword, newPassword)
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

export function verifyEmail(code) {
  return new Promise((resolve, reject) => {
    client.userManagement.verifyEmail(code)
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

export function resendEmailVerificationCode() {
  return new Promise((resolve, reject) => {
    client.userManagement.resendEmailVerificationCode()
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

export function contactUs(subject, msg) {
  return new Promise((resolve, reject) => {
    const { name, email } = getProfile(store.getState())
    client.contactUs(email, name, subject, msg)
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

// Getters and setters
export const getProfile = (state) => get(state, "profile", {})
const setProfile = (profile) => store.dispatch(set("profile", profile))
export const getProfileBillingAccounts = (state) => get(state, "profile.billing_accounts", [])
export const addBillingAccountToProfile = (id, name) => {
  const billingAccounts = getProfileBillingAccounts(store.getState())
  const newBillingAccounts = [...billingAccounts, { id, name }]
  store.dispatch(set("profile.billing_accounts", newBillingAccounts))
}

export function isLoggedIn() {
  const token = getToken()
  return token ? true : false
}
export function isEmailVerified(state) {
  return getProfile(state).is_email_verified
}

export function isBillingEnabled(state) {
  return getProfileBillingAccounts(state).length > 0
}