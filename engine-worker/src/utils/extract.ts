/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function extractInfoFromLog(
  log: string,
): { resources: string; errors: string; warnings: string; time: string } | null {
  const regex = /Resources: (.*?), Errors: (.*?), Warnings: (.*?), Time: (.*?)$/;
  const match = log.match(regex);

  if (match) {
    const [, resources, errors, warnings, time] = match;
    return { resources, errors, warnings, time };
  }

  return null;
}
