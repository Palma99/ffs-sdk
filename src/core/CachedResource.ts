export class CachedResource<T> {
  private value: T | null = null;
  private lastUpdated: number = 0;

  constructor(
    private loader: () => Promise<T>,
    private cacheTimeMs: number
  ) {}

  private get isExpired(): boolean {
    return Date.now() - this.lastUpdated > this.cacheTimeMs;
  }

  public async getValue(refresh = false): Promise<T> {
    if (!this.isExpired && this.value && !refresh) {
      return this.value;
    }

    this.value = await this.loader();
    this.lastUpdated = Date.now();

    return this.value;
  }
}