import client from '../client';
import store from "../store"
import { set, get } from 'automate-redux';
import { getToken, saveToken } from "../utils";

export function signup(name, organizationName, email, password) {
  return new Promise((resolve, reject) => {
    client.userManagement.signUp(name, organizationName, email, password)
      .then((token) => {
        // Save the token for future use 
        saveToken(token)

        // Set thr profile, so that it can be visible in the topbar
        const profile = { name, email }
        setProfile(profile)

        resolve()
      }).catch(error => reject(error))
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
      }).catch(error => reject(error))
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
export const getProfileBillingAccounts = (state) => get(state, "profile.billingAccounts", [])
export const addBillingAccountToProfile = (id, name) => {
  const billingAccounts = getProfileBillingAccounts(store.getState())
  const newBillingAccounts = [...billingAccounts, { id, name }]
  store.dispatch(set("profile.billingAccounts", newBillingAccounts))
}

export const isLoggedIn = () => {
  // const token = getToken()
  // return token ? true : false
  return true
}
export const isEmailVerified = () => {
  // return getProfile(store.getState()).isEmailVerified
  return true
}
export const isBillingEnabled = () => {
  // return getProfileBillingAccounts(store.getState()).length > 0
  return true
}