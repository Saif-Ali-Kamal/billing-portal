import gql from 'graphql-tag';
class Licenses {
  constructor(client, spaceSiteClient) {
    this.client = client;
    this.spaceSiteClient = spaceSiteClient;
  }

  createSubscription(billingId, invoiceId, promotionCode, prices) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Create_Subcription(billingId: $billingId, invoiceId: $invoiceId, promotionCode: $promotionCode, prices: $prices) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, invoiceId, promotionCode, prices }
      })
        .then(res => {
          const { status, error, message, result } = res.data.create_Subscription
          if (status !== 200) {
            reject(message)
            console.log("Error creating subscription", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  deactivateLicense(license) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Deactivate_License(license: $license) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { license }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Deactivate_License
          if (status !== 200) {
            reject(message)
            console.log("Error deactivate license", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Licenses;