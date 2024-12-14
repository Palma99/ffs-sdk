import { CachedResource } from "./CachedResource"
import { FeatureFlagServiceClient } from "./client"

type InitOptions = {
  environmentKey: string
}

export class FeatureFlagService {
  private static instance: FeatureFlagService | null = null
  private activeFlags: CachedResource<string[]>
  private client: FeatureFlagServiceClient

  static destroy() {
    FeatureFlagService.instance = null
  }  

  static init(options: InitOptions) {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService(options)
      return
    }

    throw new Error("FeatureFlagService is already initialized")
  }

  private constructor(private options: InitOptions) {
    this.client = new FeatureFlagServiceClient(this.options.environmentKey)
    this.activeFlags = new CachedResource(
      () => this.client.fetchActiveFlags(),
      10000
    )
  }

  async getActiveFlags(): Promise<string[]> {
    if (FeatureFlagService.instance === null) {
      throw new Error("FeatureFlagService is not initialized")
    }

    return this.activeFlags.getValue()
  }

  static getInstance(): FeatureFlagService {
    if (FeatureFlagService.instance === null) {
      throw new Error("FeatureFlagService is not initialized")
    }

    return FeatureFlagService.instance
  }
}

// export const getFFS: () => FeatureFlagService = FeatureFlagService.getInstance
export function getFFS(): FeatureFlagService {
  return FeatureFlagService.getInstance()
}