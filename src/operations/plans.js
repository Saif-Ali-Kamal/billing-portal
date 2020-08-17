import client from '../client';
import store from '../store';
import { set, get } from 'automate-redux';
import { countryPlanSuffixMapping, getCurrencyByCountryCode } from '../constant';
import { getBillingAccountCountry } from './billingAccount';
import { getCurrencyNotation } from '../utils';

export function loadPlans(billingId) {
  return new Promise((resolve, reject) => {
    client.plans.fetchPlans(billingId)
      .then((plans) => {
        setPlans(plans)
        resolve()
      })
      .catch(error => reject(error))
  });
}

// Getters and setters
function setPlans(plans) {
  store.dispatch(set("plans", plans))
}

export function getPlans(state, billingId) {
  const billingAccountCountryCode = getBillingAccountCountry(state, billingId)
  const plans = get(state, "plans", [])
  const currency = getCurrencyByCountryCode(billingAccountCountryCode)
  const countrySuffix = countryPlanSuffixMapping[billingAccountCountryCode] ? countryPlanSuffixMapping[billingAccountCountryCode] : ""
  const filteredPlans = plans.filter(obj => obj.currency === currency && obj.interval === "month")
  const result = filteredPlans.map(obj => {
    const product = obj.products[0]
    return {
      id: countrySuffix ? obj.id.replace(`-${countrySuffix}`, "") : obj.id,
      name: obj.type,
      amount: obj.amount / 100,
      currency: getCurrencyNotation(obj.currency),
      meta: product.meta,
      details: product.details,
      licenses_count: product.licenses_count
    }
  })
  return result
} 