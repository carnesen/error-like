import { ErrorLike } from './error-like';

/** Convert an unknown exception into an ErrorLike object literal */
export function errorLikeFromException(exception: unknown): ErrorLike {
	switch (typeof exception) {
		case 'object': {
			if (exception === null) {
				return {
					message: 'Encountered an exception that was literally null',
					stack: stackFactory(),
				};
			}
			const { message, code, stack } = exception as Record<string, unknown>;
			const errorLike: ErrorLike = {
				message: typeof message === 'string' ? message : '',
				stack: typeof stack === 'string' ? stack : stackFactory(),
			};
			if (typeof code !== 'undefined') {
				errorLike.code = String(code);
			}
			return errorLike;
		}
		case 'string':
		case 'bigint':
		case 'boolean':
		case 'number':
		case 'symbol':
		case 'undefined': {
			return {
				message: `Encountered a "${typeof exception}" exception "${String(
					exception,
				)}"`,
				stack: stackFactory(),
			};
		}
		case 'function':
			return {
				message: `A function exception has been thrown. Here is the function as a string: ${exception}`,
				stack: stackFactory(),
			};
		default: {
			return {
				message: `Encountered an exception of unexpected type ${typeof exception}`,
				stack: stackFactory(),
			};
		}
	}
}

function stackFactory(): string {
	return new Error().stack || '';
}
