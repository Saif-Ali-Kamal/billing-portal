import client from '../client';
import { get, set } from 'automate-redux';
import store from '../store';

export default function loadInvoices(billingId, startingAfter) {
  return new Promise((resolve, reject) => {
    client.invoices.fetchInvoices(billingId, startingAfter)
      .then((invoices) => {
        setInvoices(invoices)
        resolve()
      })
      .catch(error => reject(error))
  });
}

// Getters and setters
export const getInvoices = (state) => get(state, "invoices", [])
const setInvoices = (invoices) => store.dispatch(set("invoices", invoices))