// Minimal feature flags scaffold for backend. Reads from process.env or fallback to false.
export const featureFlags = {
  ENABLE_CART_MERGE: (process.env.FEATURE_ENABLE_CART_MERGE || "false") === "true",
  // add more flags here as needed
};

export function isFeatureEnabled(flagKey: keyof typeof featureFlags) {
  return !!featureFlags[flagKey];
}
