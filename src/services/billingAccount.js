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
          addBillingAccount(name: $name, billingName: $billingName, address: $address ) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { name, billingName, address }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message, result } = res.data.addBillingAccount
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
          getBillingAccounts @billing 
        }`,
        variables: {}
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message, result } = res.data.getBillingAccounts
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
          addCard(billingId: $billingId) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }
          
          const { status, error, message, result } = res.data.addCard
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
          removeCard(billingId: $billingId, cardId: $cardId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, cardId }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }

          const { status, error, message } = res.data.removeCard
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
          setDefaultCard(billingId: $billingId, cardId: $cardId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, cardId }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }
          
          const { status, error, message } = res.data.setDefaultCard
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