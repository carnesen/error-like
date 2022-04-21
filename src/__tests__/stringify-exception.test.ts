import { CodedError } from '@carnesen/coded-error';
import { stringifyException } from '..';

type Datum = {
	description: string;
	exception: unknown;
	expectedMatches: string[];
	expectedNonMatches: string[];
};

const ordinaryError = new Error('foo');

const codedError = new CodedError('bar', 2);

const data: Datum[] = [
	{
		description: 'Ordinary error',
		exception: ordinaryError,
		expectedMatches: [`Error: ${ordinaryError.message}`],
		expectedNonMatches: ['code='],
	},
	{
		description: 'Coded error',
		exception: codedError,
		expectedMatches: [
			`Error: ${codedError.message}`,
			`code=${codedError.code}`,
		],
		expectedNonMatches: [],
	},
];

describe(stringifyException.name, () => {
	for (const {
		description,
		exception,
		expectedMatches,
		expectedNonMatches,
	} of data) {
		it(description, () => {
			const result = stringifyException(exception);
			for (const expectedMatch of expectedMatches) {
				expect(result).toMatch(expectedMatch);
			}
			for (const expectedNonMatch of expectedNonMatches) {
				expect(result).not.toMatch(expectedNonMatch);
			}
		});
	}
});
