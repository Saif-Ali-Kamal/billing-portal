import React from "react";
import { Router, Route, Redirect, Switch } from "react-router";
import history from "./history";
import { PrivateRoute } from './utils';

import Signin from './pages/signin/Sigin';
import Signup from './pages/signup/Signup';
import ForgetPassword from './pages/forget-password/ForgetPassword';
import AddAccount from './pages/add-account/AddAccount';
import Licenses from './pages/licenses/Licenses';
import PurchaseLicense from './pages/licenses/PurchaseLicense';
import Invoices from './pages/invoices/Invoices';
import PomoCodes from './pages/promo-codes/PromoCodes';
import BillingAccounts from './pages/billing-accounts/BillingAccounts';
import AddBillingAccount from './pages/billing-accounts/AddBillingAccount';
import ContactUs from './pages/contact-us/ContactUs';

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={() => <Redirect to='/signin'/> } />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/forget-password' component={ForgetPassword} />
        <Route exact path='/add-account' component={AddAccount} />
        <Route exact path='/licenses' component={Licenses} /> 
        <Route exact path='/licenses/purchase' component={PurchaseLicense} /> 
        <Route exact path='/invoices' component={Invoices} /> 
        <Route exact path='/promo-codes' component={PomoCodes} /> 
        <Route exact path='/billing-accounts' component={BillingAccounts} /> 
        <Route exact path='/billing-accounts/add-account' component={AddBillingAccount} /> 
        <Route exact path='/contact-us' component={ContactUs} /> 
      </Switch>
    </Router>
  );
};