import { describe, vi, it, expect } from "vitest";
import { FeatureFlagServiceClient } from "./client";

vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
  {
    ok: true,
    json: vi.fn().mockResolvedValue({ activeFlags: ['flag1', 'flag2'] })
  }
));

describe('FeatureFlagServiceClient', () => {

  describe('fetchActiveFlags', () => {
    it('call the correct endpoint with the public key', async () => {
      const client = new FeatureFlagServiceClient(
        'test key',
        'https://flags.example.com/public/v1/',
      )
      await client.fetchActiveFlags()

      expect(fetch).toHaveBeenCalledWith(
        'https://flags.example.com/public/v1/flags?public_key=test%20key',
      )
    })
    
  })
})
