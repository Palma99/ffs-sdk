import { getAppConfig } from "./config/AppConfig"
import { CachedResource } from "./CachedResource"

export class FeatureFlagServiceClient {
  public activeFlags = new CachedResource(() => this.fetchActiveFlags(), 10000)
  
  constructor(private environmentKey: string) {}

  private urlWithPublicKey(endpoint: string): string {
    return `${getAppConfig().baseUrl}/${endpoint}?public_key=${this.environmentKey}`
  }

  async fetchActiveFlags(): Promise<string[]> {
    const url = this.urlWithPublicKey('flags')
    const response = await fetch(url)

    if (response.ok) {
      const json = await response.json() as unknown as {
        activeFlags: string[]
      }

      return json.activeFlags
    }

    return []
  }
}