import { createStore } from 'redux';
import { generateReducers } from 'automate-redux';

const initialState = {
  profile: {},
  licenses: [],
  invoices: [],
  hasMoreInvoices: false,
  promoCodes: [],
  billingAccounts: [],
  uiState: {
    showSidenav: false
  }
};

export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());