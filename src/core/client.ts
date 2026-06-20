export class FeatureFlagServiceClient {
  constructor(
    private environmentKey: string,
    private baseUrl: string,
  ) {}

  private urlWithPublicKey(endpoint: string): string {
    const normalizedBaseUrl = this.baseUrl.replace(/\/+$/, "")
    const publicKey = encodeURIComponent(this.environmentKey)

    return `${normalizedBaseUrl}/${endpoint}?public_key=${publicKey}`
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
