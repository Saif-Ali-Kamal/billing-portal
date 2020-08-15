import { spaceSiteServerURL, billingServerGraphQLURL } from "../constant"
import { getToken } from "../utils"
import { createGraphQLClient, createRESTClient } from "./client";

import BillingAccount from './billingAccount';
import Plans from './plans';
import Invoices from './invoices';
import Licenses from './licenses';
import PromoCodes from './promoCodes';
import UserManagement from './userManagement';


class Service {
  constructor() {
    this.billingClient = createGraphQLClient(billingServerGraphQLURL, getToken)
    this.spaceSiteClient = createRESTClient(spaceSiteServerURL, { credentials: "omit" })
    this.ipAPIClient = createRESTClient(undefined, { credentials: "omit" })
    this.userManagement = new UserManagement(this.billingClient, this.ipAPIClient)
    this.billingAccount = new BillingAccount(this.billingClient)
    this.plans = new Plans(this.billingClient)
    this.invoices = new Invoices(this.billingClient)
    this.licenses = new Licenses(this.billingClient)
    this.promoCodes = new PromoCodes(this.billingClient)
  }

  contactUs(email, name, subject, msg) {
    return new Promise((resolve, reject) => {
      const body = { email, name, subject, msg, source: "Billing Portal" }
      this.spaceSiteClient.postJSON("/v1/site/contact-us", body)
        .then(({ status, data }) => {
          if (status !== 200) {
            reject(new Error("Internal server error"))
            return
          }
          if (!data.ack) {
            reject(new Error("Internal server error"))
            return
          }

          resolve()
        })
        .catch(ex => reject(ex))
    })
  }
}

export default Service