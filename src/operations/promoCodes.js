import client from '../client';
import store from '../store';
import { set, get } from 'automate-redux';

export function loadPromoCodes(billingId) {
  return new Promise((resolve, reject) => {
    client.promoCodes.fetchPromotionCodes(billingId)
      .then((promoCodes) => {
        setPromoCodes(promoCodes)
        resolve()
      })
      .catch(error => reject(error))
  });
}

export function applyPromoCode(billingId, promoCode) {
  return new Promise((resolve, reject) => {
    client.promoCodes.applyPromotionCodeToCustomer(billingId, promoCode)
      .then((amount) => {
        const promoCodeDetails = {
          promotion_id: promoCode,
          promotions: [{ amount: amount }],
          time_stamp: new Date()
        }

        const promoCodes = getPromoCodes(store.getState())
        const newPromoCodes = [...promoCodes, promoCodeDetails]
        setPromoCodes(newPromoCodes)

        resolve(amount)
      })
      .catch(error => reject(error))
  });
}

// Getters and setters
export const getPromoCodes = (state) => get(state, "promoCodes", [])
const setPromoCodes = (promoCodes) => store.dispatch(set("promoCodes", promoCodes))