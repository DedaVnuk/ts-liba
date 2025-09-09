
# TryFetch

Wrapper over **fetch**

```typescript
const tryFetch = new TryFetch({
	baseUrl: 'localhost:3000/api',
})

// or with custom error data
const tryFetch = new TryFetch({
	baseUrl: 'localhost:3000/api',
	errorCreator: (response) => {
		return {
			message: 'Url not exists',
			status: response.status,
		};
	},
})

```

### query
```typescript
const users = await tryFetch.query('/users');

// or with fetch options (RequestInit options)

const users = await tryFetch.query('/users', {
	headers: {
		auth: 'key for auth',
	},
})
```

### cancel
```typescript
tryFetch.cancel();
```