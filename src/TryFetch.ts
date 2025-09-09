import { TryFetchError } from './TryFetchError';
import { isAbortError } from './utils';

type TryFetchProps<Data> = {
	baseUrl: string;
	errorCreator?: (response: Response) => {
		message: TryFetchError['message'];
		data?: Data;
		[key: string]: unknown;
	};
};

type TryFetchSuccessResponse<Data> = {
	ok: boolean;
	data?: Data;
	error?: {
		message: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
};

export class TryFetch<Data = unknown> {
	private baseUrl: string;
	private abortController = new AbortController();

	private errorCreator: Exclude<TryFetchProps<Data>['errorCreator'], undefined> = (
		response: Response,
	) => {
		return {
			ok: false,
			message: `Status: ${response.status}; message: ${response.statusText}`,
			status: response.status,
			statusText: response.statusText,
		};
	};

	constructor(props: TryFetchProps<Data>) {
		this.baseUrl = props.baseUrl;
		this.errorCreator = props.errorCreator ?? this.errorCreator;
	}

	async query<T = Data>(
		url: `/${string}`,
		options?: RequestInit,
	): Promise<TryFetchSuccessResponse<T>> {
		try {
			const response = await fetch(`${this.baseUrl}${url}`, {
				signal: this.abortController.signal,
				...options,
			});

			if(!response.ok) {
				const { message, ...props } = this.errorCreator(response);
				throw new TryFetchError(message, props);
			}

			return {
				ok: true,
				data: await response.json(),
			};
		} catch (error: unknown) {
			if(error instanceof TryFetchError) {
				return {
					ok: false,
					error: {
						message: error.message,
						...error.data,
					},
				};
			} else if(isAbortError(error)) {
				return {
					ok: false,
					error: {
						message: `Query was cancelled`,
					},
				};
			}

			return {
				ok: false,
				error: {
					message: 'Default error',
				},
			};
		}
	}

	cancel() {
		this.abortController.abort();
	}
}
