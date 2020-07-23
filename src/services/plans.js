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
          Get_Plans @billing
        }`,
        variables: {}
      })
        .then(res => {
          const { status, error, message, result } = res.data.Get_Plans
          if (status !== 200) {
            reject(message)
            console.log("Error getting plans", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Plans;