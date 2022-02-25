[![build status badge](https://github.com/carnesen/error-like/workflows/test/badge.svg)](https://github.com/carnesen/error-like/actions?query=workflow%3Atest+branch%3Amaster)

Handle TypeScript exceptions type-safely

## Usage

To install this package as a dependency in your project, in a shell do:

```
npm install --save @carnesen/error-like
```

This package includes runtime JavaScript files (ES2015) and the corresponding TypeScript type declarations.

```typescript
import { errorLikeFactory } from '@carnesen/error-like';

try {
   fs.writeFileSync("foo.dat", "foo-bar-baz");
} catch (exception) {
   const errorLike = errorLikeFactory(exception);
   if (errorLike.code !== "ENOENT") {
      throw exception;
   }
   // Exception has code "ENOENT" meaning "no such file or directory", as expected when the file hasn't yet been created by the user, which is ok.
}
```

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
