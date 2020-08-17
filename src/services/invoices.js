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
          invoices(billingId: $billingId${startingAfter ? ", startingAfter: $startingAfter" : ""}) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { billingId, startingAfter }
      })
        .then(res => {
          if (res.errors && res.errors.length > 0) {
            reject(res.errors[0].message)
            return
          }
          
          const { status, error, message, result } = res.data.invoices
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