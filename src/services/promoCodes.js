import gql from 'graphql-tag';
class PromoCodes {
  constructor(client, spaceSiteClient) {
    this.client = client;
    this.spaceSiteClient = spaceSiteClient;
  }

  applyPromotionCustomer(billingId, promotionCode) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Apply_Promotion_Customer(billingId: $billingId, promotionCode: $promotionCode) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, promotionCode }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Apply_Promotion_Customer
          if (status !== 200) {
            reject(message)
            console.log("Error applying promotion code", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  applyPromotionSubscription(billingId, subscriptionId, promotionCode) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Apply_Promotion_Customer(billingId: $billingId, subscriptionId: $subscriptionId, promotionCode: $promotionCode) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, subscriptionId, promotionCode }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Apply_Promotion_Subscription
          if (status !== 200) {
            reject(message)
            console.log("Error applying promotion code", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default PromoCodes;