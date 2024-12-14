import { beforeEach, describe, expect, it, vi } from "vitest";
import {  FeatureFlagService, getFFS } from "./sdk";

const fetchActiveFlagsSpy = vi.fn().mockResolvedValue(['flag1', 'flag2', 'flag3']);

vi.mock("./client", () => ({
  FeatureFlagServiceClient: vi.fn().mockImplementation(() => ({
    fetchActiveFlags: fetchActiveFlagsSpy
  })) 
}))

describe("FeatureFlagService", () => {
  beforeEach(() => {
    FeatureFlagService.destroy()
  })

  it("should throw an error if already initialized", () => {
    expect(() => {
      FeatureFlagService.init({ environmentKey: "test" });
      FeatureFlagService.init({ environmentKey: "test" });
    }).toThrowError("FeatureFlagService is already initialized");
  });
});
  
describe("getFFS", () => {
  beforeEach(() => {
    FeatureFlagService.destroy()
  })

  it("should throw an error when trying to get the instance before initialization", async () => {
    expect(() => {
      getFFS();
    }).toThrowError("FeatureFlagService is not initialized");
  });

  it("should return the instance when initialized", async () => {
    FeatureFlagService.init({ environmentKey: "test" });
    const ffs = getFFS();
    expect(ffs).toBeInstanceOf(FeatureFlagService);
  });
})

describe("getActiveFlags", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    FeatureFlagService.destroy()
  })

  it("should fetch remote active flags after initialization", async () => {
    expect(fetchActiveFlagsSpy).not.toHaveBeenCalled();

    FeatureFlagService.init({ environmentKey: "test" });
    await getFFS().getActiveFlags();

    expect(fetchActiveFlagsSpy).toHaveBeenCalled();
  });

  it("should return cached active flags", async () => {
    vi.useFakeTimers()
    FeatureFlagService.init({ environmentKey: "test" });

    await getFFS().getActiveFlags();
    await getFFS().getActiveFlags();

    expect(fetchActiveFlagsSpy).toHaveBeenCalledTimes(1);
    vi.useRealTimers()
  });
})