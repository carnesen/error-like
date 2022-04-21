/** Type representing an object literal with all the same properties as an
 * `Error` object plus an optional string "code" property */
export interface ErrorLike extends Error {
	code?: string;
}
