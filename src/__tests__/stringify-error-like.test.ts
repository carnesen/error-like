import { stringifyErrorLike } from '../stringify-error-like';

describe(stringifyErrorLike.name, () => {
	it('Stringifies an example', () => {
		expect(
			stringifyErrorLike({
				message: 'Oops',
				name: 'NaughtyError',
				stack: 'at Foo\nat Bar',
				code: 'TERRIBLE',
			}),
		).toBe(`NaughtyError: Oops (code=TERRIBLE). Stack:\nat Foo\nat Bar`);
	});
});
