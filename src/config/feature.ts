export const featureConfig = {
  appModeDisplay: process.env.FEATURE_APP_MODE_DISPLAY === "true",
  authEnabled: process.env.FEATURE_AUTH_ENABLED === "true",
  stripeEnabled:
    process.env.FEATURE_STRIPE_ENABLED === "true" &&
    process.env.FEATURE_AUTH_ENABLED === "true",
  socialAuthEnabled:
    process.env.FEATURE_AUTH_ENABLED === "true" &&
    process.env.FEATURE_SOCIAL_AUTH_ENABLED === "true",
  docsEnabled: process.env.FEATURE_DOCS_ENABLED === "true",
  blogEnabled: process.env.FEATURE_BLOG_ENABLED === "true",
  submissionEnabled: process.env.FEATURE_SUBMISSION_ENABLED === "true",
} as const;
