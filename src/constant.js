const getURL = (productionURL, developmentURL, mockURL) => {
  if (process.env.NODE_ENV === "production") {
    return productionURL
  }
  if (process.env.REACT_APP_DISABLE_MOCK === "true") {
    return developmentURL
  }
  return mockURL
}

export const spaceCloudClusterOrigin = getURL(undefined, "http://localhost:4122", undefined)
export const enterpriseServerGraphQLURL = getURL("https://api.spaceuptech.com/v1/api/spacecloud/graphql", "https://testing.spaceuptech.com/v1/api/spacecloud/graphql", "/v1/api/spacecloud/graphql")
