import gql from 'graphql-tag';

class Plans {
  constructor(client) {
    this.client = client;
  }

  fetchPlans(billingId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          getPlans(billingId: $billingId) @billing
        }`,
        variables: { billingId }
      })
        .then(res => {
          const { status, error, message, result } = res.data.getPlans
          if (status !== 200) {
            reject(message)
            console.log("Error getting plans", error)
            return
          }

          const { plans, billing_plan_mapping } = result
          if (!plans) plans = []
          if (!billing_plan_mapping) billing_plan_mapping = []

          const totalPlans = [...plans, ...billing_plan_mapping.map(obj => obj.plans[0])]
          resolve(totalPlans)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Plans;