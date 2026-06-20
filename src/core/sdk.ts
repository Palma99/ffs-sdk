import { CachedResource } from "./CachedResource"
import { FeatureFlagServiceClient } from "./client"

const DEFAULT_CACHE_TIME_MS = 10_000

export type InitOptions = {
  environmentKey: string
  baseUrl: string
  cacheTimeMs?: number
}

export class FeatureFlagService {
  private static instance: FeatureFlagService | null = null
  private activeFlags: CachedResource<string[]>
  private client: FeatureFlagServiceClient

  static destroy(): void {
    FeatureFlagService.instance = null
  }

  static init(options: InitOptions): void {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService(options)
      return
    }

    throw new Error("FeatureFlagService is already initialized")
  }

  private constructor(private options: InitOptions) {
    const cacheTimeMs = this.options.cacheTimeMs ?? DEFAULT_CACHE_TIME_MS

    this.client = new FeatureFlagServiceClient(
      this.options.environmentKey,
      this.options.baseUrl,
    )
    this.activeFlags = new CachedResource(
      () => this.client.fetchActiveFlags(),
      cacheTimeMs,
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

export function getFFS(): FeatureFlagService {
  return FeatureFlagService.getInstance()
}
