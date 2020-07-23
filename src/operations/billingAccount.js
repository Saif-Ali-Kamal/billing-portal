import client from '../client';
import store from '../store';
import { getProfile, addBillingAccountToProfile } from './userManagement';
import { set, get } from 'automate-redux';

export function loadBillingAccounts() {
  return new Promise((resolve, reject) => {
    client.billingAccount.fetchBillingAccounts()
      .then((billingAccounts) => {
        setBillingAccounts(billingAccounts)
        resolve()
      })
      .catch(error => reject(error))
  });
}

export function addBillingAccount(stripeClient, cardElement, billingAccountName, address) {
  return new Promise((resolve, reject) => {
    const state = store.getState()
    const { name, encrypted_email } = getProfile(state)

    client.billingAccount.addBillingAccount(name, billingAccountName, address)
      .then((result) => {
        const { clientSecret, billingId } = result
        stripeClient.confirmCardSetup(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
              email: encrypted_email,
              address: address
            },
          }
        })
          .then(result => {
            if (result.error) {
              resolve({ billingId, cardConfirmed: false, error: result.error })
              return
            }

            // Add the billing account to the profile, so that it can be seen in the topbar
            // Note the billing account we are adding here is not the entire info of that billing account.
            // Its just so that we know what all billing accounts are there with the user.
            addBillingAccountToProfile(billingId, billingAccountName)

            resolve({ billingId, cardConfirmed: true })

            // Load billing accounts in background so that we can have the info of this newly added credit card in the UI
            // This method fetches the entire info of all the billing accounts along with the credit cards associated with each billing account
            loadBillingAccounts()
          })
          .catch(ex => resolve({ cardConfirmed: false, error: ex.toString() }))
      })
      .catch(error => reject(error))
  });
}

export function addCard(billingId, stripeClient, cardElement) {
  return new Promise((resolve, reject) => {
    const state = store.getState()
    const { name, email } = getProfile(state)
    client.billingAccount.addCard(billingId)
      .then((clientSecret) => {
        stripeClient.confirmCardSetup(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
              email: email
            },
          }
        })
          .then(result => {
            if (result.error) {
              reject(reject.error)
              return
            }

            // Load billing accounts so that we can have the info of this newly added credit card in the UI
            loadBillingAccounts()
              .then(() => resolve())
              .catch(ex => resolve(ex))
          })
          .catch(ex => reject(ex))
      })
      .catch(error => reject(error))
  })
}

export function removeCard(billingId, cardId) {
  return new Promise((resolve, reject) => {
    client.billingAccount.removeCard(billingId, cardId)
      .then(() => {
        const cards = getCards(store.getState(), billingId)
        const newCards = cards.filter(card => card.id !== cardId)
        setCards(billingId, newCards)
        resolve()
      })
      .catch(ex => reject(ex))
  })
}

export function setDefaultCard(billingId, cardId) {
  return new Promise((resolve, reject) => {
    client.billingAccount.setDefaultCard(billingId, cardId)
      .then(() => {
        const cards = getCards(store.getState(), billingId)
        const newCards = cards.map(card => Object.assign({}, card, card.id === cardId ? { isDefault: true } : { isDefault: false }))
        setCards(billingId, newCards)
        resolve()
      })
      .catch(ex => reject(ex))
  })
}

// Getters and setters
const setBillingAccounts = (billingAccounts) => store.dispatch(set("billingAccounts", billingAccounts))
export const getBillingAccounts = (state) => get(state, "billingAccounts", [])
export const getBillingAccountInfo = (state, billingId) => {
  const billingAccounts = getBillingAccounts(state)
  const index = billingAccounts.findIndex(obj => obj.id === billingId)
  return index === -1 ? {} : billingAccounts[index]
}
export const getBillingAccountCountry = (state, billingId) => getBillingAccountInfo(state, billingId).country
export const getCards = (state, billingId) => {
  const billingAccount = getBillingAccountInfo(state, billingId)
  return get(billingAccount, "cards", [])
}
const setCards = (billingId, cards) => {
  const state = store.getState()
  const billingAccounts = getBillingAccounts(state)
  const billingAccountInfo = getBillingAccountInfo(state, billingId)
  const newBillingAccountInfo = Object.assign({}, billingAccountInfo, { cards })
  const newBillingAccounts = billingAccounts.map(obj => obj.id === billingId ? newBillingAccountInfo : obj)
  setBillingAccounts(newBillingAccounts)
}