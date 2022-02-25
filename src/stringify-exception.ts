import { stringifyErrorLike } from './stringify-error-like';
import { errorLikeFactory } from './error-like.factory';

export function stringifyException(exception: unknown): string {
	return stringifyErrorLike(errorLikeFactory(exception));
}
