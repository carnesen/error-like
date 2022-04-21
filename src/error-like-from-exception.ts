import { ErrorLike } from './error-like';
import { ErrorLikeName } from './error-like-name';

/** Convert an exception or anything else into an `ErrorLike` object literal
 * @param exception An `Error` or anything else
 * @returns An `ErrorLike` object literal derived from the provided `exception`
 */
export function errorLikeFromException(exception: unknown): ErrorLike {
	// There is no way to exercise the default case so let's exclude it from our
	// code coverage reports
	/* istanbul ignore next */
	switch (typeof exception) {
		// The most common case e.g. an `Error`
		case 'object': {
			// Literally `null`
			if (exception === null) {
				return {
					name: ErrorLikeName.NullException,
					message: 'Encountered an exception that was literally null',
					stack: stackFactory(),
				};
			}
			// Some other non-`null` object, most likely an `Error`
			const { name, message, code, stack } = exception as Record<
				string,
				unknown
			>;
			const errorLike: ErrorLike = {
				name:
					typeof name === 'string'
						? name
						: ErrorLikeName.NonErrorObjectException,
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
			const exceptionType = typeof exception;
			return {
				name: `${exceptionType.charAt(0).toUpperCase()}${exceptionType.slice(
					1,
				)}Exception`,
				message: `Encountered a exception of type \`${exceptionType}\`: "${String(
					exception,
				)}"`,
				stack: stackFactory(),
			};
		}
		case 'function':
			return {
				name: ErrorLikeName.FunctionException,
				message: `A function exception has been thrown. Here is the function as a string: ${exception}`,
				stack: stackFactory(),
			};
		default: {
			// This is incredibly unlikely to occur in practice, so much so that we
			// can't think of a way to unit test it even.
			/* istanbul ignore next */
			return {
				name: ErrorLikeName.UnexpectedException,
				message: `Encountered an exception of unexpected type ${typeof exception}`,
				stack: stackFactory(),
			};
		}
	}
}

function stackFactory(): string | undefined {
	return new Error().stack;
}
