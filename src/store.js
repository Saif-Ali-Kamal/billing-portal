import { createStore } from 'redux';
import { generateReducers } from 'automate-redux';

const initialState = {
  userProfile:{},
  billing: {
    licenses:[],
    invoices:[],
    billingAccount: [],
    promocodes: [],
  },
  uiState: {
    showSidenav: false
  }
};

export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());