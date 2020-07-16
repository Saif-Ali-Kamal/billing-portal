import React from "react";
import { Router, Route, Redirect } from "react-router";
import history from "./history";
import { PrivateRoute, BillingRoute } from './utils';
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
      <Route exact path='/' component={() => <Redirect to='/signup' />} />
      <Route exact path='/login' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/forget-password' component={ForgetPassword} />
      <PrivateRoute exact path='/enable-billing' component={AddAccount} />
      <BillingRoute exact path='/billing/:billingId' component={props => <Redirect to={`/billing/${props.match.params.billingId}/licenses`} />} />
      <BillingRoute exact path='/billing/:billingId/licenses' component={Licenses} />
      <BillingRoute exact path='/billing/:billingId/licenses/purchase' component={PurchaseLicense} />
      <BillingRoute exact path='/billing/:billingId/invoices' component={Invoices} />
      <BillingRoute exact path='/billing/:billingId/promo-codes' component={PomoCodes} />
      <BillingRoute exact path='/billing/:billingId/billing-accounts' component={BillingAccounts} />
      <BillingRoute exact path='/billing/:billingId/billing-accounts/add-account' component={AddBillingAccount} />
      <BillingRoute exact path='/billing/:billingId/contact-us' component={ContactUs} />
    </Router>
  );
};