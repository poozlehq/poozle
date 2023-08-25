<p align="center">
  <a href="https://poozle.dev"><img src="https://user-images.githubusercontent.com/17528887/221166175-706c5ce3-756e-49b5-985b-1dc5bf40b8e1.svg" width="200" height="100" /></a>
</p>

<div align="center">

[![Star us on GitHub](https://img.shields.io/github/stars/poozlehq/poozle?color=FFD700&label=Stars&logo=Github)](https://github.com/poozlehq/poozle)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://docs.poozle.dev/contributing)

[Quickstart](https://docs.poozle.dev/oss/deploy-poozle)
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Website](https://poozle.dev/)
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[Docs](https://docs.poozle.dev)

[![Join our Slack Server](https://img.shields.io/badge/Slack-chat%20with%20us-%235865F2?style=flat&logo=slack&logoColor=%23fff)](https://join.slack.com/t/poozle-community/shared_invite/zt-1u4mz911h-FeWpOA82wA8kyrz3xg58xQ)
[![Tweet at us on Twitter](https://img.shields.io/badge/Twitter-tweet%20at%20us-1da1f2?style=flat&logo=twitter&logoColor=%23fff)](https://twitter.com/poozlehq)

[Love Poozle? Give us a ⭐ on GitHub!](https://github.com/poozlehq/poozle)

</div>

<p align="center">
    <em>Poozle is an open-source single API for Product Integrations
</em>
</p>

Poozle provides complete devtooling around product integrations. Companies need to extract their customers' data tools like Github, Jira, Notion, Zendesk, Salesforce etc. Hence in the journey companies end up building their own integration infrastructure. Poozle provides a single API for the same that enables companies to integrate multiple of these tools at once. We do the hard work of integrating and smoothing them and exposing developers to a clean and unified interface. We aim to make it easy for companies to build new integrations.


## One Data model
Don't muck with data transformations and API quirks. Common Models provide normalized, constantly synced data for each category of integrations.

![One Model](https://github.com/poozlehq/engine/assets/17528887/a43c7e92-a74f-44eb-8906-e3a2502fcced)


## Features

- Managed Authentication
- Bi-directional data syncing
- Automatic rate-limits & retries
- Pagination
- Unified data model
- Webhooks (coming soon)
- Built-in monitoring (coming soon)

## In your code

- Add a line to get your users to connect their accounts using our react-sdk:

```js
import { usePoozleLink } from "@poozle/react-poozle-link";

const { open: poozleOpen, isReady } = usePoozleLink({
  linkId: "bb966689-5b7e-4aee-ac78-fe036c2612ce",
});
```

## Getting Started 🚀

Try Poozle in 10 minutes with the [Quickstart](https://docs.poozle.dev/quickstart) 🚀.

## 5+ pre-configured Integrations, easily add your own

Poozle works with **any** API and use-case. Adding [Integration](https://docs.poozle.dev/guides/build_new_integration) is easy and we already have the main APIs covered.

5+ Integrations are pre-configured to work out-of-the-box, including:

- **Ticketing**: GitHub, GitLab, Linear, Jira, Asana etc.
- **Messaging**: Slack, Gmail etc.

If your favourite Integration is missing
[open a GitHub issue](https://github.com/poozlehq/poozle/issues/new)

## Contributing

Whether it's big or small, we love contributions. Check out our guide to see how to get started.

Not sure where to get started? You can:

- Join our [Slack](https://join.slack.com/t/poozle-community/shared_invite/zt-1u4mz911h-FeWpOA82wA8kyrz3xg58xQ), and ask us any questions there.

## Reporting vulnerabilities

⚠️ Please do not file GitHub issues or post on our public forum for security vulnerabilities as they are public! ⚠️

Poozle takes security issues very seriously. If you have any concerns about Poozle or believe you have uncovered a vulnerability, please get in touch via the e-mail address support@poozle.dev. In the message, try to describe the issue and ideally a way of reproducing it. The security team will get back to you as soon as possible.

Note that this security address should be used only for undisclosed vulnerabilities. Please report any security problems to us before disclosing it publicly.

## License

The product is under the [MIT License](https://github.com/poozlehq/poozle/blob/main/LICENSE.md)
