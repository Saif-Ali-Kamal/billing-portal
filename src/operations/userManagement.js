import client from '../client';
import { useDispatch } from 'react-redux';
import { set } from 'automate-redux';

const dispatch = useDispatch();

export function signup (name, organizationName, email, password) {
  return new Promise((resolve, reject) => {
    client.signup.signUp(name, organizationName, email, password).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

function getTokenClaims(token) {
  const temp = token.split(".")
  const decoded = atob(temp[1])
  let claims = {}
  try {
    const decodedObj = JSON.parse(decoded)
    claims = decodedObj
  } catch (error) {
    console.log("Error decoding token", error)
  }
  return claims
}

function saveToken (token) {
  const { email, name } = getTokenClaims(token)

  localStorage.setItem("name", name)
  localStorage.setItem("email", email)
  localStorage.setItem("token", token)
  dispatch(set('userProfile', { name: name, email: email }))
  
}

export function signin (email, password) {
  return new Promise((resolve, reject) => {
    client.userManagement.signIn(email, password).then(token => {
      saveToken(token)
      resolve()
    }).catch(error => reject(error))
  });
}

export function forgotPasswordGenerateCode (email) {
  return new Promise((resolve, reject) => {
    client.forgotPassword.forgotPasswordGenerateCode(email).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export function forgotPasswordVerifyCode (code, userId, password) {
  return new Promise((resolve, reject) => {
    client.forgotPassword.forgotPasswordVerifyCode(code, userId, password).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export function changePassword (oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    client.changePassword.changePassword(oldPassword, newPassword).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export function verifyEmail (code) {
  return new Promise((resolve, reject) => {
    client.addAccount.verifyEmail(code).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export function resendVerifyEmail () {
  return new Promise((resolve, reject) => {
    client.addAccount.resendVerifyEmail().then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}
