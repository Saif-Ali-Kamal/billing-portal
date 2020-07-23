import gql from 'graphql-tag';
class BillingAccount {
  constructor(client) {
    this.client = client;
  }

  addBillingAccount(name, billingName, address) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Add_Billing_Account(name: $name, billingName: $billingName, address: $address ) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { name, billingName, address }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Add_Billing_Account
          if (status !== 200) {
            reject(message)
            console.log("Error adding billing account", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  fetchBillingAccounts() {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Get_Billing_Accounts @billing {
            status
            error
            message
            result {
              id
              name
              balance
              cards {
                id
                brand
                last4
                expiry
                isDefault
              }
            }
          }
        }`,
        variables: {}
      })
        .then(res => {
          const { status, error, message, result } = res.data.Get_Billing_Accounts
          if (status !== 200) {
            reject(message)
            console.log("Error fetching billing accounts", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  addCard(billingId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Add_Card(billingId: $billingId) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Add_Card
          if (status !== 200) {
            reject(message)
            console.log("Error adding card", error)
            return
          }
          resolve(result.clientSecret)
        })
        .catch(ex => reject(ex))
    })
  }

  removeCard(billingId, cardId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Remove_Card(billingId: $billingId, cardId: $cardId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, cardId }
      })
        .then(res => {
          const { status, error, message } = res.data.Remove_Card
          if (status !== 200) {
            reject(message)
            console.log("Error removing card", error)
            return
          }
          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  setDefaultCard(billingId, cardId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Set_Default_Card(billingId: $billingId, cardId: $cardId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, cardId }
      })
        .then(res => {
          const { status, error, message } = res.data.Set_Default_Card
          if (status !== 200) {
            reject(message)
            console.log("Error setting default card", error)
            return
          }
          resolve()
        })
        .catch(ex => reject(ex))
    })
  }
}

export default BillingAccount;