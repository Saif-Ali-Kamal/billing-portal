import client from '../client';
import store from '../store';
import { set, get } from 'automate-redux';
import { countryPlanSuffixMapping } from '../constant';
import { getBillingAccountCountry } from './billingAccount';
import { getCurrencyNotation } from '../utils';

export function loadPlans() {
  return new Promise((resolve, reject) => {
    client.plans.fetchPlans()
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
  const countrySuffix = countryPlanSuffixMapping[billingAccountCountryCode] ? countryPlanSuffixMapping[billingAccountCountryCode] : ""
  const filteredPlans = plans.filter(obj => obj.id.endsWith("monthly-" + countrySuffix))
  const result = filteredPlans.map(obj => {
    const product = obj.products[0]
    const name = product.name.replace("Space Cloud - ", "").replace(" Plan", "")
    return {
      id: obj.id.replace(`-${countrySuffix}`, ""),
      name: name,
      amount: obj.amount / 100,
      currency: getCurrencyNotation(obj.currency),
      quotas: product.quotas
    }
  })
  return result
} 