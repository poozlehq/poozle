---
title: Contributing to Poozle
---

Thank you for your interest in contributing! We love community contributions. Contribution guidelines are listed below. If you're unsure about how to start contributing or have any questions even after reading them, feel free to ask us on Slack in the #dev or #general channel.

However, for those who want a bit more guidance on the best way to contribute to Poozle, read on. This document will cover what we're looking for. By addressing the points below, the chances that we can quickly merge or address your contributions will increase.

## Code of conduct

Please follow our [Code of conduct](./code_of_conduct.md) in the context of any contributions made to Poozle.

## Poozle specification

Before you can start contributing, you need to understand [Poozle's data protocol specification](../understanding_poozle/protocol.md).

## First-time contributors, welcome!

We appreciate first time contributors and we are happy to assist you in getting started. In case of questions, just reach out to us via [email](mailto:hey@poozle.dev) or [Slack](https://join.slack.com/t/poozle-community/shared_invite/zt-1u4mz911h-FeWpOA82wA8kyrz3xg58xQ)!

Here is a list of easy [good first issues](https://github.com/poozlehq/engine/labels/good%20first%20issue) to do.

### Steps to contributing code

#### 1. Open an issue, or find a similar one.

Before jumping into the code please first:

1. Verify if an existing [issue](https://github.com/poozlehq/engine/issues) GitHub issue matches your contribution project.
2. If you don't find an existing issue, create a new [issue](https://github.com/poozlehq/engine/issues/new/choose) to explain what you want to achieve.
3. Assign the issue to yourself and add a comment to tell that you want to work on this.

This will enable our team to make sure your contribution does not overlap with existing works and will comply with the design orientation we are currently heading the product toward.
If you do not receive an update on the issue from our team, please ping us on [Slack](https://join.slack.com/t/poozle-community/shared_invite/zt-1u4mz911h-FeWpOA82wA8kyrz3xg58xQ)!

#### 2. Code your contribution

1. To contribute to a extension, fork the [repository](https://github.com/poozlehq/engine).
2. If contributing a new extension, check out our [new extensions guide](#new-extensions).
3. Open a branch for your work.
4. Code.
5. For extensions, make sure to increment the extension's version according to our [Semantic Versioning](#semantic-versioning-for-extensions) guidelines.

#### 3. Open a pull request

1. Rebase master with your branch before submitting a pull request.
2. Open the pull request.
3. Wait for a review from a community maintainer or our team.

#### 4. Review process

When we review, we look at:

- ‌Does the PR solve the issue?
- Is the proposed solution reasonable?
- Is it tested?
- Is it introducing security risks?
  ‌Once your PR passes, we will merge it 🎉.

### New extensions

It's easy to add your own extension to Poozle! **Since Poozle extensions are encapsulated within Docker containers, you can use any language you like.** Here are some links on how to add extensions. We haven't built the documentation for all languages yet, so don't hesitate to reach out to us if you'd like help developing extensions in other languages.

For extensions, simply head over to our [Typescript EDK](../building_extension/overview.md).

- See [Building new extentions](../building_extension/overview.md) to get started.

**Please note that, at no point in time, we will ask you to maintain your extension.** The goal is that the Poozle team and the community helps maintain the extension.

### Semantic versioning for extensions

Changes to extension behavior should always be accompanied by a version bump and a changelog entry. We use [semantic versioning](https://semver.org/) to version changes to extensions. Since extensions are a bit different from APIs, we have our own take on semantic versioning, focusing on maintaining the best user experience of using a extension.

- Major: a version in which a change is made which requires manual intervention (update to config or configured catalog) for an existing connection to continue to succeed, or one in which data that was previously being synced will no longer be synced
- Minor: a version that introduces user-facing functionality in a backwards compatible manner
- Patch: a version that introduces backwards compatible bug fixes or performance improvements

## Contributing to documentation

Our goal is to keep our docs comprehensive and updated. If you would like to help us in doing so, we are grateful for any kind of contribution:

- Report missing content
- Fix errors in existing docs
- Help us in adding to the docs

## Other ways to contribute

### Upvoting issues, feature and extensions requests

You are welcome to add your own reactions to the existing issues. We will take them in consideration in our prioritization efforts, especially for extensions.

❤️ means that this task is CRITICAL to you.
👍 means it is important to you.

### Requesting new features

To request new features, please create an issue on this project.

If you would like to suggest a new feature, we ask that you please use our issue template. It contains a few essential questions that help us understand the problem you are looking to solve and how you think your recommendation will address it.

Watch out for duplicates!

### Requesting new extensions

This is very similar to requesting new features. The template will change a bit and all extension requests will be tagged with the “**community**” and “**area/extensions**” labels.

To see what has already been proposed by the community, you can look [here](https://github.com/poozlehq/engine/labels/area%2Fextensions). Again, watch out for duplicates!

### Reporting bugs

**‌**Bug reports help us make Poozle better for everyone. We provide a preconfigured template for bugs to make it very clear what information we need.

‌Please search within our [already reported bugs](https://github.com/poozlehq/engine/issues?q=is%3Aissue+is%3Aopen+label%3Atype%2Fbug) before raising a new one to make sure you're not raising a duplicate.

### Reporting security issues

Please do not create a public GitHub issue. If you've found a security issue, please email us directly at [support@poozle.dev](mailto:support@poozle.dev) instead of raising an issue.
