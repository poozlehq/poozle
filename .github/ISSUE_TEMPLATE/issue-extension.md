name: Extension Issue
description: Use this when you're facing issue with extension
title: "Extension Issue: "
labels: [type/bug, extension, needs-triage]
body:

- type: input
  id: extension-name
  attributes:
  label: Extension Name
  description: Give the extension name in form of ext-google-admin, ext-slack
  validations:
  required: true
- type: input
  id: extension-version
  attributes:
  label: Extension Version
  description: Give the extension version you're using.
  validations:
  required: true
- type: dropdown
  id: step
  attributes:
  label: What step the error happened?
  multiple: false
  options: - Configuring a new extension - During the API usage - Updating the extension - Other
- type: textarea
  id: description
  attributes:
  label: Revelant information
  description: Please give any aditional information you have your steps to reproduce the problem.
- type: textarea
  id: logs
  attributes:
  label: Relevant log output
  description: |
  Please copy and paste any relevant log output.
  This will be automatically formatted into code, so no need for backticks.
  We strongly recommend to upload the log file to further debugging.
  render: shell
- type: checkboxes
  id: submit-pr
  attributes:
  label: Contribute
  description: Are you willing to submit the fix?
  options: - label: Yes, I want to contribute
  required: false