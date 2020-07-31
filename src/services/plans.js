import gql from 'graphql-tag';

class Plans {
  constructor(client) {
    this.client = client;
  }

  fetchPlans() {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          getPlans @billing
        }`,
        variables: {}
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

          const totalPlans = [...plans, ...billing_plan_mapping]
          resolve(totalPlans)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Plans;