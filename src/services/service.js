import gql from 'graphql-tag';
import { spaceCloudClusterOrigin, enterpriseServerGraphQLURL } from "../constant"
import { getToken } from "../utils"
import { createGraphQLClient } from "./client";

import BillingAccount from './billingAccount';
import Invoices from './invoices';
import Licenses from './licenses';
import PromoCodes from './promoCodes';
import UserManagement from './userManagement';


class Service {
  constructor(token) {
    this.client = createGraphQLClient(enterpriseServerGraphQLURL, getToken)
    this.userManagement = new UserManagement(this.client)
    this.billingAccount = new BillingAccount(this.client)
    this.invoices = new Invoices(this.client)
    this.licenses = new Licenses(this.client)
    this.promoCodes = new PromoCodes(this.client) 
    if (token) this.client.setToken(token);
  }

  execGraphQLQuery(projectId, graphqlQuery, variables, token) {
    let uri = `/v1/api/${projectId}/graphql`
    if (spaceCloudClusterOrigin) {
      uri = "http://localhost:4122" + uri;
    }
    const client = createGraphQLClient(uri, () => token)
    return new Promise((resolve, reject) => {
      if (graphqlQuery.includes("mutation")) {
        client.mutate({
          mutation: gql`${graphqlQuery}`,
          variables: variables
        }).then(({ data, errors }) => resolve({ data, errors })).catch(ex => reject(ex))
      } else {
        client.query({
          query: gql`${graphqlQuery}`,
          variables: variables
        }).then(({ data, errors }) => resolve({ data, errors })).catch(ex => reject(ex))
      }
    })
  }
}

export default Service