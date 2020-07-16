import gql from 'graphql-tag';
class Invoices {
  constructor(client) {
    this.client = client
  }

  fetchInvoices(billingId, startingAfter) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Invoices(billingId: $billingId${startingAfter ? ", startingAfter: $startingAfter" : ""}) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, startingAfter }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Invoices
          if (status !== 200) {
            reject(message)
            console.log("Error fetching invoices", error)
            return
          }

          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Invoices;