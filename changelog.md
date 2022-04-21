# **@carnesen/error-like** changelog

## Upcoming

- Breaking: Make `ErrorLike`'s `stack` optional to align this type with the built-in `Error` interface

- Feature: Support "name" property in `ErrorLike` interface by making it a simple extension of the built-in `Error` interface.

- Internal: Update dev dependencies

## carnesen-error-like-0.1.0 (2022-02-27)

- Breaking: Rename `errorLikeFactory` to `errorLikeFromException` for better parity with `stringifyException`. Also some people don't like "factory". It's to Java-esque. "FromX" is more typical in JavaScript/TypeScript APIs.

## carnesen-error-like-0.0.0 (2022-02-25)

- Add type `ErrorLike`

- Add function `errorLikeFactory` for converting an `unknown` exception into an ErrorLike object literal

- Add function `stringifyErrorLike` for converting an `ErrorLike` to a string for logging

- Add function `stringifyException` for converting an `unknown` exception into a string for logging
