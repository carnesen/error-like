import { CodedError } from '@carnesen/coded-error';
import { errorLikeFromException } from '..';

type Datum = {
	description: string;
	exception: unknown;
	expectedResult: {
		message: string;
		stack?: string;
		code?: string;
	};
};

const ordinaryError = new Error('foo');

const codedError = new CodedError('bar', 2);

const data: Datum[] = [
	{
		description: 'Ordinary error',
		exception: ordinaryError,
		expectedResult: {
			message: ordinaryError.message,
			stack: ordinaryError.stack,
		},
	},
	{
		description: 'Coded error',
		exception: codedError,
		expectedResult: {
			message: codedError.message,
			stack: codedError.stack,
			code: String(codedError.code),
		},
	},
	{
		description: 'null',
		exception: null,
		expectedResult: {
			message: 'literally',
		},
	},
	{
		description: 'bigint',
		exception: 1n,
		expectedResult: {
			message: 'bigint',
		},
	},
	{
		description: 'function',
		exception: () => {},
		expectedResult: {
			message: 'function',
		},
	},
];

describe(errorLikeFromException.name, () => {
	for (const { description, exception, expectedResult } of data) {
		it(description, () => {
			const result = errorLikeFromException(exception);
			expect(result.message).toMatch(expectedResult.message);
			if (expectedResult.stack) {
				expect(result.stack).toBe(expectedResult.stack);
			}
			if (expectedResult.code) {
				expect(result.code).toBe(expectedResult.code);
			}
		});
	}
});
