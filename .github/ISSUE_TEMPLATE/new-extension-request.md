name: New Extension Request
about: Use this to request a new extension
title: ""
labels: [extension, new-extension]
body:

- type: input
  id: extension-name
  attributes:
  label: Extension Name
  description: What is the API you want to integrate
  validations:
  required: true
- type: textarea
  id: description
  attributes:
  label: Revelant Information
  description: >-
  Why do you need this integration? How does your team intend to use the data? This helps us understand the use case.
  How often do you want to run syncs?
  If this is an API which has openAPI spec available?
- type: checkboxes
  id: submit-pr
  attributes:
  label: Contribute
  description: Are you willing to submit the fix?
  options: - label: Yes
  required: true
