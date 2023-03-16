"use strict";
const path = require("path");

const getSuccessMessage = function (
  extensionName,
  outputPath,
  additionalMessage
) {
  return `
🚀 🚀 🚀 🚀 🚀 🚀

Success! 

Your ${extensionName} extension has been created at .${path.resolve(
    outputPath
  )}.

Follow the TODOs in the generated module to implement your connector. 

Questions, comments, or concerns? Let us know in our github:
https://github.com/poozlehq/engine/discussions

We're always happy to provide any support!

${additionalMessage || ""}
`;
};

module.exports = function (plop) {
  const RestBaseInputFolder = "../extension-rest";
  const RestBaseNewInputFolder = "../extension-rest-new";

  const GraphQLBaseInputFolder = "../extension-graphql";

  const outputDir = "../../extensions";
  const BasedExtensionOutput = `${outputDir}/{{dashCase name}}`;

  plop.setActionType("emitSuccess", function (answers, config, plopApi) {
    console.log(
      getSuccessMessage(
        answers.name,
        plopApi.renderString(config.outputPath, answers),
        config.message
      )
    );
  });

  plop.setGenerator("Rest based extension", {
    description: "Generate a Extension that works on REST",
    prompts: [
      { type: "input", name: "name", message: 'Extension name e.g: "jira"' },
    ],
    actions: [
      {
        abortOnFail: true,
        type: "addMany",
        destination: BasedExtensionOutput,
        base: RestBaseInputFolder,
        templateFiles: `${RestBaseInputFolder}/**/**`,
      },
      // plop doesn't add dotfiles by default so we manually add them
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseInputFolder}/.gitignore.hbs`,
        path: `${BasedExtensionOutput}/.gitignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseInputFolder}/.eslintrc.hbs`,
        path: `${BasedExtensionOutput}/.eslintrc`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseInputFolder}/.prettierrc.json.hbs`,
        path: `${BasedExtensionOutput}/.prettierrc.json`,
      },
      { type: "emitSuccess", outputPath: BasedExtensionOutput },
    ],
  });

  plop.setGenerator("Rest based extension (Mesh based)", {
    description: "Generate a Extension that works on REST",
    prompts: [
      { type: "input", name: "name", message: 'Extension name e.g: "jira"' },
    ],
    actions: [
      {
        abortOnFail: true,
        type: "addMany",
        destination: BasedExtensionOutput,
        base: RestBaseNewInputFolder,
        templateFiles: `${RestBaseNewInputFolder}/**/**`,
      },
      // plop doesn't add dotfiles by default so we manually add them
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseNewInputFolder}/.gitignore.hbs`,
        path: `${BasedExtensionOutput}/.gitignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseNewInputFolder}/.eslintrc.hbs`,
        path: `${BasedExtensionOutput}/.eslintrc`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${RestBaseNewInputFolder}/.prettierrc.json.hbs`,
        path: `${BasedExtensionOutput}/.prettierrc.json`,
      },
      { type: "emitSuccess", outputPath: BasedExtensionOutput },
    ],
  });

  plop.setGenerator("GraphQL based extension", {
    description: "Generate a Extension that works on GraphQL",
    prompts: [
      { type: "input", name: "name", message: 'Extension name e.g: "jira"' },
    ],
    actions: [
      {
        abortOnFail: true,
        type: "addMany",
        destination: BasedExtensionOutput,
        base: GraphQLBaseInputFolder,
        templateFiles: `${GraphQLBaseInputFolder}/**/**`,
      },
      // plop doesn't add dotfiles by default so we manually add them
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${GraphQLBaseInputFolder}/.gitignore.hbs`,
        path: `${BasedExtensionOutput}/.gitignore`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${GraphQLBaseInputFolder}/.eslintrc.hbs`,
        path: `${BasedExtensionOutput}/.eslintrc`,
      },
      {
        type: "add",
        abortOnFail: true,
        templateFile: `${GraphQLBaseInputFolder}/.prettierrc.json.hbs`,
        path: `${BasedExtensionOutput}/.prettierrc.json`,
      },
      { type: "emitSuccess", outputPath: BasedExtensionOutput },
    ],
  });
};
