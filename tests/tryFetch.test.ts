import { TryFetch } from '../src/TryFetch';

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

const tryFetch = new TryFetch<Todo>({
	baseUrl: 'https://jsonplaceholder.typicode.com',
});

describe('success way', () => {
	test('success query', async () => {
		const res = await tryFetch.query('/todos/1');

		expect(res.ok).toBeTruthy();
		expect(res.data).toEqual({
			userId: 1,
			id: 1,
			title: 'delectus aut autem',
			completed: false,
		});
	});

	test('fetch options', async () => {
		const res = await tryFetch.query('/todos/1', {
			cache: 'force-cache',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		expect(res.data).toEqual({
			userId: 1,
			id: 1,
			title: 'delectus aut autem',
			completed: false,
		});
	});
});

describe('error way', () => {
	test('error query', async () => {
		const res = await tryFetch.query('/todo');
		expect(res.ok).toBeFalsy();
		expect(res.error?.message).toEqual('Status: 404; message: Not Found');
	});

	test('custor error format', async () => {
		const tryFetchWithCustomError = new TryFetch({
			baseUrl: 'https://jsonplaceholder.typicode.com',
			errorCreator: (response) => {
				return {
					message: 'Url not exists',
					data: [],
					status: response.status,
				};
			},
		});

		expect(await tryFetchWithCustomError.query('/todo')).toEqual({
			ok: false,
			error: {
				message: 'Url not exists',
				status: 404,
				data: [],
			},
		});
	});

	test('cancel', async () => {
		const res = tryFetch.query('/todos');
		tryFetch.cancel();

		expect(await res).toEqual({
			ok: false,
			error: {
				message: 'Query was cancelled',
			},
		});
	});

	test('fake url', async () => {
		const tryFetchFake = new TryFetch({
			baseUrl: '',
		});

		expect(await tryFetchFake.query('/')).toEqual({
			ok: false,
			error: {
				message: 'Default error',
			},
		});
	});
});
