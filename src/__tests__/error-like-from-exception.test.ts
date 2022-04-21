import { CodedError } from '@carnesen/coded-error';
import { errorLikeFromException } from '..';
import { ErrorLikeName } from '../error-like-name';

type Datum = {
	description: string;
	exception: unknown;
	expectedResult: {
		name?: string;
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
		description: 'empty object',
		exception: {},
		expectedResult: {
			message: '',
			name: ErrorLikeName.NonErrorObjectException,
		},
	},
	{
		description: 'null',
		exception: null,
		expectedResult: {
			message: 'literally',
			name: ErrorLikeName.NullException,
		},
	},
	{
		description: 'bigint',
		exception: 1n,
		expectedResult: {
			message: 'bigint',
			name: ErrorLikeName.BigintException,
		},
	},
	{
		description: 'string',
		exception: 'foo',
		expectedResult: {
			message: 'string',
			name: ErrorLikeName.StringException,
		},
	},
	{
		description: 'boolean',
		exception: true,
		expectedResult: {
			message: 'boolean',
			name: ErrorLikeName.BooleanException,
		},
	},
	{
		description: 'number',
		exception: 123,
		expectedResult: {
			message: 'number',
			name: ErrorLikeName.NumberException,
		},
	},
	{
		description: 'undefined',
		exception: undefined,
		expectedResult: {
			message: 'undefined',
			name: ErrorLikeName.UndefinedException,
		},
	},

	{
		description: 'symbol',
		exception: Symbol('foo'),
		expectedResult: {
			message: 'symbol',
			name: ErrorLikeName.SymbolException,
		},
	},
	{
		description: 'function',
		exception: () => {},
		expectedResult: {
			message: 'function',
			name: ErrorLikeName.FunctionException,
		},
	},
];

describe(errorLikeFromException.name, () => {
	for (const { description, exception, expectedResult } of data) {
		it(description, () => {
			const result = errorLikeFromException(exception);
			expect(result.message).toMatch(expectedResult.message);
			expect(result.stack).toBeTruthy();
			if (expectedResult.stack) {
				expect(result.stack).toBe(expectedResult.stack);
			}
			if (expectedResult.code) {
				expect(result.code).toBe(expectedResult.code);
			}
			expect(result.name).toBeTruthy();
			if (expectedResult.name) {
				expect(result.name).toBe(expectedResult.name);
			}
		});
	}
});
