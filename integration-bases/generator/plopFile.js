"use strict";
const path = require("path");

const getSuccessMessage = function (
  integrationName,
  outputPath,
  additionalMessage
) {
  return `
🚀 🚀 🚀 🚀 🚀 🚀

Success! 

Your ${integrationName} integration has been created at .${path.resolve(
    outputPath
  )}.

Follow the TODOs in the generated module to implement your integration. 

Questions, comments, or concerns? Let us know in our github:
https://github.com/poozlehq/engine/discussions

We're always happy to provide any support!

${additionalMessage || ""}
`;
};

module.exports = function (plop) {
  const ticketingPath = "../ticketing";

  const outputDir = "../../integrations/ticketing";
  const ticketingIntegrationOutput = `${outputDir}/{{snakeCase name}}`;

  plop.setActionType("emitSuccess", function (answers, config, plopApi) {
    console.log(
      getSuccessMessage(
        answers.name,
        plopApi.renderString(config.outputPath, answers),
        config.message
      )
    );
  });

  plop.setGenerator("Ticketing Integration", {
    description:
      "Generate a Integration that pulls data from a Ticketing SAAS tool.",
    prompts: [
      { type: "input", name: "name", message: 'Integration name e.g: "jira"' },
    ],
    actions: [
      {
        abortOnFail: true,
        type: "addMany",
        destination: ticketingIntegrationOutput,
        base: ticketingPath,
        templateFiles: `${ticketingPath}/**/**`,
      },
      // plop doesn't add dotfiles by default so we manually add them
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${ticketingPath}/.eslintignore.hbs`,
        path: `${ticketingIntegrationOutput}/.eslintignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${ticketingPath}/.gitignore.hbs`,
        path: `${ticketingIntegrationOutput}/.gitignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${ticketingPath}/.eslintrc.hbs`,
        path: `${ticketingIntegrationOutput}/.eslintrc`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${ticketingPath}/.prettierrc.hbs`,
        path: `${ticketingIntegrationOutput}/.prettierrc`,
      },
      { type: "emitSuccess", outputPath: ticketingIntegrationOutput },
    ],
  });
};
