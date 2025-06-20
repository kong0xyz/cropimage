export const featureConfig = {
  submissionEnabled: process.env.FEATURE_SUBMISSION_ENABLED === "true",
  authEnabled: process.env.FEATURE_AUTH_ENABLED === "true",
  docsEnabled: process.env.FEATURE_DOCS_ENABLED === "true",
  blogEnabled: process.env.FEATURE_BLOG_ENABLED === "true",
  stripeEnabled: process.env.FEATURE_STRIPE_ENABLED === "true",
};
