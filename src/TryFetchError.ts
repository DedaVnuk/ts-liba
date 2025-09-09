export class TryFetchError extends Error {
	constructor(message: string, private props?: Record<string, unknown>) {
		super(message);
	}

	get data() {
		return this.props;
	}
}
