import client from '../client';

export default function createSubscription (billingId, invoiceId, promotionCode, prices) {
  return new Promise((resolve, reject) => {
    client.licenses.createSubscription(billingId, invoiceId, promotionCode, prices).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}

export default function deactivateLicense (license) {
  return new Promise((resolve, reject) => {
    client.licenses.deactivateLicense(license).then(() => {
      
      resolve()
    }).catch(error => reject(error))
  });
}