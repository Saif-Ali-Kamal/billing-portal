import client from '../client';

export default function invoices (starttingAfter, billingId) {
  return new Promise((resolve, reject) => {
    client.invoices.invoices(starttingAfter, billingId).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

