import { FeatureFlagService, getFFS } from './src/main'

FeatureFlagService.init({
  environmentKey: "PK_test_public_key",
  baseUrl: "http://localhost:3000/public/v1",
})

document.addEventListener("DOMContentLoaded", async () => {
  const activeFlags = await getFFS().getActiveFlags()
});
