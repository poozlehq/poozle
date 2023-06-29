# Integration Development Kit \(Typescript\)

The Poozle Typescript IDK is a framework for rapidly developing production-grade Poozle connectors. The IDK currently offers helpers specific for creating Poozle integration connectors for:

- Ticketing
- Messaging

The IDK provides an improved developer experience by providing basic implementation structure and abstracting away low-level glue boilerplate.

This document is a general introduction to the IDK.

## Getting Started

Generate an empty connector using the code generator. First clone the Poozle repository then from the repository root run

```text
cd engine-integrations/integration-templates/generator
yarn
yarn generate
```

then follow the interactive prompt. Next, find all `TODO`s in the generated project directory -- they're accompanied by lots of comments explaining what you'll need to do in order to implement your connector. Upon completing all TODOs properly, you should have a functioning connector.
