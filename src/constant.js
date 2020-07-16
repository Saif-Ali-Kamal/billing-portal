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
