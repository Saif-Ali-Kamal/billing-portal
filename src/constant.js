export const stripeKey = "pk_test_86Z4cMrqx8qC7bHLa0nLeQYs00D1MqsudX"
export const plans = [
  {
    id: "pro",
    name: "Pro",
    amount: 150,
    clusters: 2,
    projects: 1,
    databases: 3
  },
  {
    id: "business",
    name: "Business",
    clusters: 5,
    projects: 5,
    databases: -1
  }
]
const getURL = (productionURL, developmentURL, mockURL) => {
  if (process.env.NODE_ENV === "production") {
    return productionURL
  }
  if (process.env.REACT_APP_DISABLE_MOCK === "true") {
    return developmentURL
  }
  return mockURL
}

export const spaceSiteServerURL = getURL("https://api.spaceuptech.com", "https://api.spaceuptech.com", undefined)
export const billingServerGraphQLURL = getURL("https://billing.spaceuptech.com/v1/api/spacecloud/graphql", "https://testing.spaceuptech.com/v1/api/spacecloud/graphql", "/v1/api/spacecloud/graphql")
