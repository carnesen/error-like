/** `ErrorLike` name values assigned by `errorLikeFromException` for non-`Error`
 * exceptions like `null` and `undefined` */
export const enum ErrorLikeName {
	BigintException = 'BigintException',
	BooleanException = 'BooleanException',
	FunctionException = 'FunctionException',
	NonErrorObjectException = 'NonErrorObjectException',
	NumberException = 'NumberException',
	NullException = 'NullException',
	StringException = 'StringException',
	SymbolException = 'SymbolException',
	UndefinedException = 'UndefinedException',
	UnexpectedException = 'UnexpectedException',
}
