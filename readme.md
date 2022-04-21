[![build status badge](https://github.com/carnesen/error-like/workflows/test/badge.svg)](https://github.com/carnesen/error-like/actions?query=workflow%3Atest+branch%3Amaster)

A utility library for handling TypeScript exceptions type-safely. This package is thoroughly documented, tested, and actively maintained. I use it extensively in my own projects, and you're welcome to use it too!

## Usage

To install this package as a dependency in your project, in a shell do:

```
npm install --save @carnesen/error-like
```

This package includes runtime JavaScript files and the corresponding TypeScript type declarations.

A common use case for this package is handling exceptions in a type-safe way. For example we can check the error code:

```typescript
import { errorLikeFromException } from '@carnesen/error-like';

try {
   fs.writeFileSync("foo.dat", "foo-bar-baz");
} catch (exception) {
   const errorLike = errorLikeFromException(exception);
   if (errorLike.code === "ENOENT") {
      // No such file or directory. This is expected if the file doesn't exist.
   } else {
      throw exception;
   }

}
```

Another use case is logging exceptions:

```typescript
import { stringifyException } from '@carnesen/error-like';

try {
   something();
} catch (exception) {
   // The `toString` method on an `Error` object includes 
   // the message and the name properties but it does
   // NOT include the call stack. This is no good:
   console.log(`Worst way to log an exception: ${exception}`);
   // If we call `console.log` on the full `Error` object, it's 
   // kind enough to includes the full call stack. This is ok:
   console.log(exception);
   // That's still not great though because from it's not always 
   // easy to look at the logged exception even with the call stack
   // and infer where it originates from in our code. It's best to
   // include in the log message both a unique string that we
   // can search for in our codebase as well as all the salient
   // properties of the original exception. This is best:
   console.log(`Something failed: ${stringifyException(exception)}`)
}
```

Another use case is JSON serializing `Error` objects:

```typescript
import { errorLikeFromException } from '@carnesen/error-like';

const error = new Error('Oops');

console.log(JSON.stringify(error));
// {}

console.log(errorLikeFromException(error));
// {
//   name: 'Error',
//   message: 'Oops',
//   stack: 'Error: Oops\n' +
//     '    at Object.<anonymous> ...'
// }
```

## More information

If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/error-like).

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
