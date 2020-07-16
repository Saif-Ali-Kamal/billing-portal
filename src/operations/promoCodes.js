import client from '../client';
import store from '../store';
import { set, get } from 'automate-redux';
import { getBillingAccountInfo } from './billingAccount';

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
          promotionCode: promoCode,
          amount: amount,
          applied_on: new Date()
        }

        const promoCodes = getPromoCodes(store.getState())
        const newPromoCodes = [...promoCodes, promoCodeDetails]
        setPromoCodes(newPromoCodes)

        resolve()
      })
      .catch(error => reject(error))
  });
}

// Getters and setters
const getPromoCodes = (state) => get(state, "promoCodes", [])
const setPromoCodes = (promoCodes) => store.dispatch(set("promoCodes", promoCodes))