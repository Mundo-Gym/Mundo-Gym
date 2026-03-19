#!/usr/bin/env bash
set -eu
echo "Checking feature flag environment variables (CI-friendly)"

echo "Frontend: NEXT_PUBLIC_FLAG_CART_MERGE=${NEXT_PUBLIC_FLAG_CART_MERGE:-<unset>}"
echo "Backend: FEATURE_ENABLE_CART_MERGE=${FEATURE_ENABLE_CART_MERGE:-<unset>}"

exit 0
