import { describe, expect, it, vi } from "vitest";
import { CachedResource } from "./CachedResource";

describe.only("CachedResource", () => {
  it("should call the loader and return the value", async () => {
    vi.useFakeTimers()
    const loaderSpy = vi.fn().mockResolvedValue("test")
    const cachedResource = new CachedResource(loaderSpy, 10000)
    expect(await cachedResource.getValue()).toBe("test")
    vi.useRealTimers()
  })

  it("should not call the loader if the value is not expired", async () => {
    vi.useFakeTimers()
    const loaderSpy = vi.fn().mockResolvedValue("test")
    const cachedResource = new CachedResource(loaderSpy, 10000)

    expect(await cachedResource.getValue()).toBe("test")
    expect(await cachedResource.getValue()).toBe("test")

    expect(loaderSpy).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it("should call the loader if the value is expired", async () => {
    vi.useFakeTimers()
    const loaderSpy = vi.fn().mockResolvedValue("test")
    const cachedResource = new CachedResource(loaderSpy, 10000)

    expect(await cachedResource.getValue()).toBe("test")
    vi.advanceTimersByTime(9999)
    expect(await cachedResource.getValue()).toBe("test")

    vi.advanceTimersByTime(10001)
    expect(await cachedResource.getValue()).toBe("test")

    expect(loaderSpy).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })
})