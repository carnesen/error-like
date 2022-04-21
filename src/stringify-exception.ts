import { stringifyErrorLike } from './stringify-error-like';
import { errorLikeFromException } from './error-like-from-exception';

/** Convert an exception into a human-readable string suitable for logging
 * @param exception An `Error` or anything else
 * @returns A human-readable string version of the provided `exception`
 */
export function stringifyException(exception: unknown): string {
	return stringifyErrorLike(errorLikeFromException(exception));
}
