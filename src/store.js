import { createStore } from 'redux';
import { generateReducers } from 'automate-redux';

const initialState = {
  profile: {
    name: "Jayesh Choudhary",
    email: "jayesh@spaceuptech.com",
    createdOn: new Date()
  },
  licenses: [
    {
      id: "1b6b8a79-d4c6-45c8-a4a9-84ff6ec6036d",
      type: "PRO",
      periodicity: "annual",
      status: "active",
      purchase_date: new Date(),
      license_key_mapping: [
        {
          key: "some-key",
          value: "some-value",
          meta: {
            clusterName: "Cluster 1"
          }
        }
      ]
    }
  ],
  invoices: [],
  promoCodes: [],
  billingAccounts: [
    {
      id: "billingaccount1",
      name: "Billing Account 1",
      country: "IN",
      balance: 4500,
      cards: [
        {
          id: "card1",
          brand: "visa",
          last4: 4179,
          expiry: "04/22",
          isDefault: true
        }
      ]
    }
  ],
  uiState: {
    showSidenav: false
  }
};

export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());