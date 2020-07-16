import gql from 'graphql-tag';
class UserManagement {
  constructor(client, spaceSiteClient) {
    this.client = client;
    this.spaceSiteClient = spaceSiteClient;
  }

  signUp(name, organizationName, email, password) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Sign_Up(name: $name, organizationName: $organizationName, email: $email, password: $password) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { name, organizationName, email, password }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Sign_Up
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
          Sign_In(email: $email, password: $password) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { email, password }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Sign_In
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
          Fetch_Profile @users {
            status
            error
            message
            result
          }
        }`,
        variables: {}
      })
        .then(res => {
          const { status, error, message, result } = res.data.Fetch_Profile
          if (status !== 200) {
            reject(message)
            console.log("Error fetching profile", error)
            return
          }

          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  forgotPasswordGenerateCode(email) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Forgot_Pass_Generate_Code(email: $email) @users {
            status
            error
            message
          }
        }`,
        variables: { email }
      })
        .then(res => {
          const { status, error, message } = res.data.Forgot_Pass_Generate_Code
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
          Forgot_Pass_Verify_Code(code: $code, password: $password) @users {
            status
            error
            message
          }
        }`,
        variables: { code, password }
      })
        .then(res => {
          const { status, error, message } = res.data.Forgot_Pass_Verify_Code
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
          Change_Password(oldPassword: $oldPassword, newPassword: $newPassword) @users {
            status
            error
            message
          }
        }`,
        variables: { oldPassword, newPassword }
      })
        .then(res => {
          const { status, error, message } = res.data.Change_Password
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
          Verify_Email(code: $code) @users {
            status
            error
            message
            result
          }
        }`,
        variables: { code }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Verify_Email
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
          Resend_VerificatIon_Email @users {
            status
            error
            message
          }
        }`,
        variables: {}
      })
        .then(res => {
          const { status, error, message } = res.data.Resend_VerificatIon_Email
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