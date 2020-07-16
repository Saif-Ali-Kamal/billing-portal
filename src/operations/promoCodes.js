import client from '../client';
import { useDispatch } from 'react-redux';
import { set } from 'automate-redux';

const dispatch = useDispatch();

export default function deactivateLicense (billingId, subscriptionId, promotionCode) {
  return new Promise((resolve, reject) => {
    client.promoCodes.applyPromotionCustomer(billingId, subscriptionId, promotionCode).then(() => {
      resolve()
    }).catch(error => reject(error))
  });
}