import { describe, vi, it, expect } from "vitest";
import { FeatureFlagServiceClient } from "./client";

vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
  {
    ok: true,
    json: vi.fn().mockResolvedValue({ activeFlags: ['flag1', 'flag2'] })
  }
));

vi.stubEnv('VITE_API_PUBLIC_URL', 'feature_flag_service_api_url')

describe('FeatureFlagServiceClient', () => {

  describe('fetchActiveFlags', () => {
    it('call the correct endpoint with the public key', async () => {
      const client = new FeatureFlagServiceClient('test')
      await client.fetchActiveFlags()

      expect(fetch).toHaveBeenCalledWith(
        'feature_flag_service_api_url/flags?public_key=test',
      )
    })
    
  })
})