"use strict";
const path = require("path");

const getSuccessMessage = function (
  connectorName,
  outputPath,
  additionalMessage
) {
  return `
🚀 🚀 🚀 🚀 🚀 🚀

Success! 

Your ${connectorName} extension has been created at .${path.resolve(
    outputPath
  )}.

Follow the TODOs in the generated module to implement your connector. 

Questions, comments, or concerns? Let us know in our github:
https://github.com/poozlehq/poozle/discussions

We're always happy to provide any support!

${additionalMessage || ""}
`;
};

module.exports = function (plop) {
  const httpApiInputRoot = '../extension-react-http-api';

  const outputDir = "../../extensions";
  const httpApiOutputRoot = `${outputDir}/{{dashCase name}}`;

  plop.setActionType("emitSuccess", function (answers, config, plopApi) {
    console.log(
      getSuccessMessage(
        answers.name,
        plopApi.renderString(config.outputPath, answers),
        config.message
      )
    );
  });

  plop.setGenerator("React HTTP API Extension", {
    description:
      "Generate a Extension that pulls data from a synchronous HTTP API.",
    prompts: [
      { type: "input", name: "name", message: 'Extension name e.g: "jira"' },
    ],
    actions: [
      {
        abortOnFail: true,
        type: "addMany",
        destination: httpApiOutputRoot,
        base: httpApiInputRoot,
        templateFiles: `${httpApiInputRoot}/**/**`,
      },
      // plop doesn't add dotfiles by default so we manually add them
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${httpApiInputRoot}/.eslintignore.hbs`,
        path: `${httpApiOutputRoot}/.eslintignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${httpApiInputRoot}/.gitignore.hbs`,
        path: `${httpApiOutputRoot}/.gitignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${httpApiInputRoot}/.editorconfig.hbs`,
        path: `${httpApiOutputRoot}/.editorconfig`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${httpApiInputRoot}/.eslintrc.hbs`,
        path: `${httpApiOutputRoot}/.eslintrc`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${httpApiInputRoot}/.prettierrc.hbs`,
        path: `${httpApiOutputRoot}/.prettierrc`,
      },
      { type: "emitSuccess", outputPath: httpApiOutputRoot },
    ],
  });
};
