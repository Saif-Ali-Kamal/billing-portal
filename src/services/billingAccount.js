import gql from 'graphql-tag';
class BillingAccount {
  constructor(client, spaceSiteClient) {
    this.client = client;
    this.spaceSiteClient = spaceSiteClient;
  }

  addBillingAccount(name, email, paymentMethodID, country, line1, line2, postalCode, state) {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Add_Billing_Account(name: $name, email: $email, paymentMethodID: $paymentMethodID, 
              address:{ country: $country, line1: $line1, line2: $line2, postalCode: $postalCode, state: $state ) @billing {
            status
            error
            message
            result
          }
        }`,
        variables: { name, email, paymentMethodID, country, line1, line2, postalCode, state  }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Add_Billing_Account
          if (status !== 200) {
            reject(message)
            console.log("Error adding billing account", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }

  getBillingAccount() {
    return new Promise((resolve, reject) => {
      this.client.query({
        query: gql`
        query {
          Get_Billing_Accounts @billing {
            status
            error
            message
            result
            # []obj {
              # id
              # name
              # cardNumber
              # cardExpiry
              # balance
            }
          }
        }`,
        variables: {  }
      })
        .then(res => {
          const { status, error, message, result } = res.data.Get_Billing_Accounts
          if (status !== 200) {
            reject(message)
            console.log("Error getting billing account", error)
            return
          }
          resolve(result)
        })
        .catch(ex => reject(ex))
    })
  }
}

export default BillingAccount;