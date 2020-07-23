import gql from 'graphql-tag';
class Licenses {
  constructor(client) {
    this.client = client;
  }

  fetchLicenses(billingId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Get_Licenses (billingId: $billingId) @billing
        }`,
        variables: { billingId }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Get_Licenses
          if (status !== 200) {
            reject(message)
            console.log("Error fetching licenses", error)
            return
          }

          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  createSubscription(billingId, plans, cardId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Create_Subscription(billingId: $billingId, plans: $plans${cardId ? ", cardId: $cardId" : ""}) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, plans, cardId }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Create_Subscription
          if (status !== 200) {
            reject(message)
            console.log("Error creating subscription", error)
            return
          }

          const { subscription, licenses } = result
          if (!subscription) subscription = {}
          const { latest_invoice = {}, status: subscriptionStatus } = subscription
          const { payment_intent = {} } = latest_invoice
          const ack = subscriptionStatus === "active"
          const requiresAction = subscriptionStatus === "incomplete" && payment_intent.status === "requires_action"
          const paymentIntentSecret = payment_intent.client_secret
          if (ack || requiresAction) {
            resolve({ ack, licenses, paymentIntentSecret })
            return
          }

          console.log("Error creating subscription", error)
          reject(message)
        })
        .catch(ex => reject(ex))
    })
  }

  deactivateLicense(billingId, licenses) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Deactivate_License(licenses: $licenses, billingId: $billingId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, licenses }
      })
        .then(res => {
          const { status, error, message } = res.data.Deactivate_License
          if (status !== 200) {
            reject(message)
            console.log("Error deactivating licenses", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  renewLicense(billingId, licenses) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Renew_License(licenses: $licenses, billingId: $billingId) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, licenses }
      })
        .then(res => {
          const { status, error, message } = res.data.Renew_License
          if (status !== 200) {
            reject(message)
            console.log("Error renewing licenses", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }

  removeLicenseKey(billingId, licenseId, licenseKey) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Remove_License_key(billingId: $billingId, licenseId: $licenseId, licenseKey: $licenseKey) @billing {
            status
            error
            message
          }
        }`,
        variables: { billingId, licenseId, licenseKey }
      })
        .then(res => {
          const { status, error, message } = res.data.Remove_License_key
          if (status !== 200) {
            reject(message)
            console.log("Error removing license key", error)
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Licenses;