import client from '../client';

export default function addBillingAccount (name, email, paymentMethodID, country, line1, line2, postalCode, state) {
  return new Promise((resolve, reject) => {
    client.billingAccount.addBillingAccount(name, email, paymentMethodID, country, line1, line2, postalCode, state).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export default function getBillingAccount () {
  return new Promise((resolve, reject) => {
    client.billingAccount.getBillingAccount().then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}