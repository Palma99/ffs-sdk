import { FeatureFlagService, getFFS } from './src/main'

FeatureFlagService.init({
  environmentKey: "PK_test_public_key"
})

document.addEventListener("DOMContentLoaded", async () => {
  const activeFlags = await getFFS().getActiveFlags()
});
