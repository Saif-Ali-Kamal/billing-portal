import gql from 'graphql-tag';
class Invoices {
  constructor(client, spaceSiteClient) {
    this.client = client;
    this.spaceSiteClient = spaceSiteClient;
  }

  getInvoices(startingAfter, billingId) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Invoices(startingAfter: $startingAfter, billingId: $billingId) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { startingAfter, billingId }
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