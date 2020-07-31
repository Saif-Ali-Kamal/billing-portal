import gql from 'graphql-tag';
class PromoCodes {
  constructor(client) {
    this.client = client;
  }

  fetchPromotionCodes(billingId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          getPromotions(billingId: $billingId) @billing
        }`,
        variables: { billingId }
      })
        .then(res => {
          const { status, error, message, result } = res.data.getPromotions
          if (status !== 200) {
            reject(message)
            console.log("Error fetching applied promotion codes", error)
            return
          }

          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  applyPromotionCodeToCustomer(billingId, promotionCode) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          applyPromotionCustomer(billingId: $billingId, promotionCode: $promotionCode) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, promotionCode }
      })
        .then(res => {
          const { status, error, message, result } = res.data.applyPromotionCustomer
          if (status !== 200) {
            reject(message)
            console.log("Error applying promotion code", error)
            return
          }

          resolve(result.amount)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default PromoCodes;