import { ErrorLike } from './error-like';

/** Convert an `ErrorLike` object into a human-readable string
 * @param errorLike An `ErrorLike` object e.g. from `errorLikeFromException`
 * @returns A human-readable string version of the provided `errorLike` object
 */
export function stringifyErrorLike(errorLike: ErrorLike): string {
	/** The string result. [V8](https://v8.dev/) prefixes the stack property with
	 * a line `<name>: <message>` but other JavaScript engines do not. Let's
	 * cover our bases and be sure to always include the name and message in the
	 * stringified result. */
	let stringified = `${errorLike.name}: ${errorLike.message}`;
	if (errorLike.code) {
		stringified += ` (code=${errorLike.code})`;
	}
	if (errorLike.stack) {
		stringified += `. Stack:\n${errorLike.stack}`;
	}
	return stringified;
}
