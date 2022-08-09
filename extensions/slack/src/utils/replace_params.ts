export function replaceParams(urlPath: string, args: { [x: string]: string }) {
  let path = urlPath;
  const data = args;

  const keys = Object.keys(args) as string[];
  keys.forEach((key) => {
    const before = path;
    path = path.replace(bracedString(key), args[key]);
    if (before !== path) delete data[key];
  });
  return { path, data };
}

function bracedString(value: string) {
  return `{${value}}`;
}
