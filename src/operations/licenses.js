import client from '../client';
import store from '../store';
import { set, get } from 'automate-redux';

export function loadLicenses(billingId) {
  return new Promise((resolve, reject) => {
    client.licenses.fetchLicenses(billingId)
      .then((invoices) => {
        setLicenses(invoices)
        resolve()
      })
      .catch(error => reject(error))
  });
}

export function createSubscription(billingId, planId, cardId) {
  return new Promise((resolve, reject) => {
    client.licenses.createSubscription(billingId, [planId], cardId)
      .then((licenses) => {
        const oldLicenses = getLicenses(store.getState())
        const newLicenses = [...oldLicenses, ...licenses]
        setLicenses(newLicenses)

        resolve(licenses[0].id)
      })
      .catch(error => reject(error))
  });
}

export function deactivateLicense(billingId, licenseId) {
  return new Promise((resolve, reject) => {
    client.licenses.deactivateLicense(billingId, [licenseId])
      .then(() => {
        const oldLicenses = getLicenses(store.getState())
        const newLicenses = oldLicenses.filter(obj => obj.id !== licenseId)
        setLicenses(newLicenses)

        resolve()
      }).catch(error => reject(error))
  });
}

export function renewLicense(billingId, licenseId) {
  return new Promise((resolve, reject) => {
    client.licenses.renewLicense(billingId, [licenseId])
      .then(() => {
        const oldLicenses = getLicenses(store.getState())
        const newLicenses = oldLicenses.map(obj => obj.id === licenseId ? Object.assign({}, obj, { status: "active" }) : obj)
        setLicenses(newLicenses)

        resolve()
      }).catch(error => reject(error))
  });
}

// Getters and setters
const setLicenses = (licenses) => store.dispatch(set("licenses", licenses))
export const getLicenses = (state) => get(state, "licenses", [])
const getLicense = (state, licenseId) => {
  const licenses = getLicenses(state)
  const index = licenses.findIndex(obj => obj.id === licenseId)
  return index === -1 ? {} : licenses[index]
}
export const getLicenseKeys = (state, licenseId) => {
  const license = getLicense(state, licenseId)
  return get(license, "license_key_mapping", [])
}
export const getLicenseKeySecret = (state, licenseId, licenseKey) => {
  const licenseKeys = getLicenseKeys(state, licenseId)
  const index = licenseKeys.findIndex(obj => obj.key === licenseKey)
  return index === -1 ? "" : licenseKeys[index].value
}