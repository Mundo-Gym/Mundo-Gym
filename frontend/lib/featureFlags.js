// Simple feature flags scaffold: read from env vars `NEXT_PUBLIC_FLAG_<NAME>`
export function isFeatureEnabled(flagName) {
  if (!flagName) return false;
  try {
    const envKey = `NEXT_PUBLIC_FLAG_${flagName.toUpperCase()}`;
    const val = process.env[envKey];
    if (typeof val === "undefined") return false;
    return String(val).toLowerCase() === "true";
  } catch (e) {
    return false;
  }
}
