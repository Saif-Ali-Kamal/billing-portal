import gql from 'graphql-tag';
class UserManagement {
  constructor(client, ipAPIClient) {
    this.client = client;
    this.ipAPIClient = ipAPIClient;
  }

  fetchIpAddress() {
    return new Promise((resolve, reject) => {
      this.ipAPIClient.getJSON("https://ipapi.co/json/")
        .then(({ status, data }) => {
          if (status !== 200) {
            reject(new Error("Could not fetch ip address"))
            return
          }

          const { ip: sourceIp, country_code: countryCode } = data
          if (!sourceIp || !countryCode) {
            reject(new Error("Did not receive ip address or country code"))
            return
          }

          resolve({ sourceIp, countryCode })
        })
        .catch(ex => reject(ex))
    })
  }

  signUp(name, organizationName, email, password, sourceIp, countryCode) {

    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          signUp(name: $name, organizationName: $organizationName, email: $email, password: $password, sourceIp: $sourceIp, countryCode: $countryCode) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { name, organizationName, email, password, sourceIp, countryCode }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }
          
          const { status, error, message, result } = res.data.signUp
          if (status !== 200) {
            reject(message)
            console.log("Error in signup", error)
            return
          }

          const token = result.token

          if (!token) {
            reject(new Error("Token not provided by backend"))
            return
          }

          resolve(token)
        })
        .catch(ex => reject(ex))
    })
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          signIn(email: $email, password: $password) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { email, password }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message, result } = res.data.signIn
          if (status !== 200) {
            reject(message)
            console.log("Signin Error", error)
            return
          }

          const token = result.token

          if (!token) {
            reject(new Error("Token not provided by backend"))
            return
          }

          resolve(token)
        })
        .catch(ex => reject(ex))
    })
  }

  fetchProfile() {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          fetchProfile @users
        }`,
        variables: {}
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message, result } = res.data.fetchProfile
          if (status !== 200) {
            reject(message)
            console.log("Error fetching profile", error)
            return
          }

          if (result && result.length > 0 && result[0]) {
            resolve(result[0])
            return
          }

          reject("No profile received")
        })
        .catch(ex => reject(ex))
    })
  }

  forgotPasswordGenerateCode(email) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          forgotPassGenerateCode(email: $email) @users {
            status
            error
            message
          }
        }`,
        variables: { email }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message } = res.data.forgotPassGenerateCode
          if (status !== 200) {
            reject(message)
            console.log("Error generating code for forgot password", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  forgotPasswordVerifyCode(code, password) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          forgotPassVerifyCode(code: $code, password: $password) @users {
            status
            error
            message
          }
        }`,
        variables: { code, password }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message } = res.data.forgotPassVerifyCode
          if (status !== 200) {
            reject(message)
            console.log("Error verifying code for forgot password", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          changePassword(oldPassword: $oldPassword, newPassword: $newPassword) @users {
            status
            error
            message
          }
        }`,
        variables: { oldPassword, newPassword }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message } = res.data.changePassword
          if (status !== 200) {
            reject(message)
            console.log("Error changing password", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  verifyEmail(code) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          verifyEmail(code: $code) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { code }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message, result } = res.data.verifyEmail
          if (status !== 200) {
            reject(message)
            console.log("Error verifing email", error)
            return
          }

          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  resendEmailVerificationCode() {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          resendVerificatIonEmail @users {
            status
            error
            message
          }
        }`,
        variables: {}
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message } = res.data.resendVerificatIonEmail
          if (status !== 200) {
            reject(message)
            console.log("Error resending verification email", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

}

export default UserManagement;