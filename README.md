# FFS SDK

A lightweight TypeScript SDK for retrieving active feature flags from a Feature
Flag Service environment.

## Installation

```bash
npm install @palma99/ffs-sdk
```

## Usage

```ts
import { FeatureFlagService, getFFS } from "@palma99/ffs-sdk"

FeatureFlagService.init({
  environmentKey: "PK_your_public_environment_key",
  baseUrl: "https://flags.example.com/public/v1",
})

const activeFlags = await getFFS().getActiveFlags()

if (activeFlags.includes("new-checkout")) {
  // Enable the feature.
}
```

`FeatureFlagService.init` must be called once before `getFFS`. Calling it more
than once throws an error.

## Configuration

```ts
type InitOptions = {
  environmentKey: string
  baseUrl: string
  cacheTimeMs?: number
}
```

- `environmentKey`: public key identifying the environment.
- `baseUrl`: URL of the Feature Flag Service public API.
- `cacheTimeMs`: duration of the in-memory cache in milliseconds. Defaults to
  `10000`.

The SDK uses the global `fetch` API and therefore works in modern browsers and
JavaScript runtimes that provide `fetch`.

## API

### `FeatureFlagService.init(options)`

Creates the shared SDK instance.

### `getFFS()`

Returns the initialized SDK instance. It throws if `init` has not been called.

### `getFFS().getActiveFlags()`

Returns a `Promise<string[]>` containing the active flag names. Results are
cached according to `cacheTimeMs`.

### `FeatureFlagService.destroy()`

Destroys the shared instance. This is primarily useful for tests or when an
application needs to initialize the SDK again with different options.

## Development

```bash
npm install
npm run test:run
npm run build
```

## License

[MIT](LICENSE)
