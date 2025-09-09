export const isAbortError = (value: unknown) => {
	return !!value && typeof value === 'object' && 'name' in value && value.name === 'AbortError';
};

export const isObject = (value: unknown) => {
	return !!value && typeof value === 'object';
};
