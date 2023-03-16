/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function getConfigJSON(config64: string) {
  try {
    if (config64) {
      const buff = new Buffer(config64, "base64");
      let config = buff.toString("utf8");
      config = JSON.parse(config);

      // This to check if the base64 is still not parsed to JSON
      if (typeof config === "string") {
        config = JSON.parse(config);
      }

      return config;
    }

    return {};
  } catch (e) {
    return {};
  }
}
