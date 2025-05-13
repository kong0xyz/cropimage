export const featureConfig = {
  submissionEnabled: process.env.FEATURE_SUBMISSION_ENABLED === "true",
  clerkEnabled: process.env.FEATURE_CLERK_ENABLED === "true",
  docsEnabled: process.env.FEATURE_DOCS_ENABLED === "true",
  stripeEnabled: process.env.FEATURE_STRIPE_ENABLED === "true",
};
