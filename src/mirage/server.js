import { Server, Model, RestSerializer, Response } from "miragejs";
import fixtures from './fixtures'
import gql from "graphql-tag"

function respondOk(body = {}) {
  return new Response(200, {}, body)
}
function getRootField(ast) {
  const { definitions = [] } = ast
  if (definitions.length === 0) return ""
  const definition = definitions[0]
  const selectionSet = definition.selectionSet.selections[0]
  const { name } = selectionSet
  return name.value
}
function graphQLAPIHandler(request, schema) {
  const body = JSON.parse(request.requestBody)
  const { query } = body;
  const ast = gql(query);
  const field = getRootField(ast)
  switch (field) {
    case "event_logs":
      return { data: { event_logs: schema.db.eventLogs } }
    case "Signin":
      return { data: { signin: { status: 200, result: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJpZCI6InNvbWUtdXNlci1pZCIsImlhdCI6MTUxNjIzOTAyMn0.pNdj5obmNuQ5nkgwLm05zhUSTUks4ZqVLXdHvyiF1oE" } } } }
    case "create_subscription":
      const subscriptionSuccessResult = { id: "sub_1234", status: "active", latest_invoice: { payment_intent: { status: "succeeded" } } }
      // const requiresActionResult = { id: "sub_1234", status: "incomplete", latest_invoice: { id: "in_1234", payment_intent: { status: "requires_action" } } }
      return { data: { create_subscription: { status: 200, result: subscriptionSuccessResult } } }
    case "create_failed_subscription":
      return { data: { create_failed_subscription: { status: 200 } } }
    case "register_cluster":
      return { data: { register_cluster: { status: 200, result: { clusterId: "some-cluster-id", clusterKey: "some-cluster-key" } } } }
    case "update_plan":
      return { data: { update_plan: { status: 200 } } }
    case "add_promotion":
      return { data: { add_promotion: { status: 200, result: { amount: 2500 } } } }
    case "billing_details":
      return { data: { billing_details: { status: 200, result: { country: "IN", card_number: "4078", card_type: "visa", card_expiry_date: "8/25", amount: 2500 } } } }
    case "plans":
      return { data: { plans: [{ product: { name: "Space Cloud - Starter Plan" }, amount: 2500, currency: "usd", meta: { maxDatabases: 3, maxProjects: 1 } }] } }
    case "invoices":
      const invoices = [
        { id: "1", number: "inv_1234", status: "paid", amount: 2500, currency: "usd", period: { start: 1589081001203, end: 1589081001203 } }
      ]
      return { data: { invoices: { status: 200, result: invoices } } }
    case "clusters":
      return { data: { clusters: [{ id: "cluster1", name: "Cluster 1" }] } }
    default:
      return { data: {} }
  }
}

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    
    serializers: {
      project: RestSerializer.extend({ keyForCollection() { return "result" } }),
      serviceRoute: RestSerializer.extend({ keyForCollection() { return "result" } })
    },

    routes() {
      this.namespace = "v1";
      this.timing = 500;

      // API endpoints 
      this.post("/api/spacecloud/graphql", (schema, request) => graphQLAPIHandler(request, schema));
    }
  });

  return server;
}
