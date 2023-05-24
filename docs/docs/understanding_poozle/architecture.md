---
description: A high level view of Poozle's components.
---

# Architecture overview

Poozle is conceptually composed of two parts: platform and extensions.

The platform provides all the horizontal services required to configure and run API operations e.g: the UI, configuration API, logging, etc. and is structured as a set of microservices.

Extensions are independent modules which do CRUD to/from API sources. Extensions are built in accordance with the Poozle Specification, which describes the interface with which CRUD between API source using Poozle.

A more concrete diagram can be seen below:

![3.048-Kilometer view](../../static/img/Architecture.svg)
