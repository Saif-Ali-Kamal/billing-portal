import client from '../client';
import { get, set } from 'automate-redux';
import store from '../store';

export default function loadInvoices(billingId) {
  return new Promise((resolve, reject) => {
    const invoices = getInvoices(store.getState())
    const noOfInvoices = invoices.length
    const startingAfter = noOfInvoices > 0 ? invoices[noOfInvoices - 1].id : undefined
    client.invoices.fetchInvoices(billingId, startingAfter)
      .then((invoices = []) => {
        const oldInvoices = getInvoices(store.getState())
        const newInvoices = startingAfter ? [...oldInvoices, ...invoices] : invoices
        setInvoices(newInvoices)
        setHasMoreInvoices(invoices.length < 10 ? false : true)
        resolve()
      })
      .catch(error => reject(error))
  });
}

// Getters and setters
export const getInvoices = (state) => get(state, "invoices", [])
export const getHasMoreInvoices = (state) => get(state, "hasMoreInvoices", true)
const setInvoices = (invoices) => store.dispatch(set("invoices", invoices))
const setHasMoreInvoices = (hasMoreInvoices) => store.dispatch(set("hasMoreInvoices", hasMoreInvoices))