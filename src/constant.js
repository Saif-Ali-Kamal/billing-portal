export const stripeKey = "pk_live_Lq674TgqtTSAxQSdVZOZDn9300jIWrJyoh"
// export const plans = [
//   {
//     id: "space-cloud-pro--monthly",
//     name: "Pro",
//     amount: 150,
//     clusters: 2,
//     projects: 1,
//     databases: 3
//   },
//   {
//     id: "business",
//     name: "Business",
//     clusters: 5,
//     projects: 5,
//     databases: -1
//   }
// ]

export const countryPlanSuffixMapping = {
  "IN": "inr"
}

export const getCurrencyByCountryCode = (countryCode) => {
  return countryPlanSuffixMapping[countryCode] ? countryPlanSuffixMapping[countryCode] : "usd"
}

const getURL = (productionURL, developmentURL, mockURL) => {
  if (process.env.NODE_ENV === "production") {
    return productionURL
  }
  if (process.env.REACT_APP_ENABLE_MOCK === "true") {
    return mockURL
  }
  return developmentURL
}

export const spaceSiteServerURL = getURL("https://api.spaceuptech.com", "https://api.spaceuptech.com", undefined)
export const billingServerGraphQLURL = getURL("https://api.spaceuptech.com/v1/api/spacecloud/graphql", "https://testing.spaceuptech.com/v1/api/spacecloud/graphql", "/v1/api/spacecloud/graphql")
