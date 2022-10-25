import fs from 'fs';
import os from 'node:os';
import path from 'node:path';
import path$1 from 'path';

import fastGlob from 'fast-glob';
const DEFAULT_EXTENSIONS = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];
const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm;
const singlelineCommentsRE = /\/\/.*/g;
class MagicString {
  constructor(str) {
    this.str = str;
    this.starts = '';
    this.ends = '';
  }
  append(content) {
    this.ends += content;
    return this;
  }
  prepend(content) {
    this.starts = content + this.starts;
    return this;
  }
  overwrite(start, end, content) {
    if (end < start) {
      throw new Error(`"end" con't be less than "start".`);
    }
    if (!this.overwrites) {
      this.overwrites = [];
    }
    this.overwrites.push({ loc: [start, end], content });
    return this;
  }
  toString() {
    let str = this.str;
    if (this.overwrites) {
      const arr = [...this.overwrites].sort((a, b) => b.loc[0] - a.loc[0]);
      for (const {
        loc: [start, end],
        content,
      } of arr) {
        str = str.slice(0, start) + content + str.slice(end);
      }
    }
    return this.starts + str + this.ends;
  }
}
function relativeify(relative) {
  if (relative === '') {
    return '.';
  }
  if (!relative.startsWith('.')) {
    return `./${relative}`;
  }
  return relative;
}
async function walk(ast, visitors, ancestors = []) {
  let _a;
  if (!ast) {
    return;
  }
  if (Array.isArray(ast)) {
    for (const element of ast) {
      await walk(element, visitors, ancestors);
    }
  } else {
    ancestors = ancestors.concat(ast);
    for (const key of Object.keys(ast)) {
      await (typeof ast[key] === 'object' && walk(ast[key], visitors, ancestors));
    }
  }
  await ((_a = visitors[ast.type]) === null || _a === void 0
    ? void 0
    : _a.call(visitors, ast, ancestors));
}
walk.sync = function walkSync(ast, visitors, ancestors = []) {
  let _a;
  if (!ast) {
    return;
  }
  if (Array.isArray(ast)) {
    for (const element of ast) {
      walkSync(element, visitors, ancestors);
    }
  } else {
    ancestors = ancestors.concat(ast);
    for (const key of Object.keys(ast)) {
      typeof ast[key] === 'object' && walkSync(ast[key], visitors, ancestors);
    }
  }
  (_a = visitors[ast.type]) === null || _a === void 0 ? void 0 : _a.call(visitors, ast, ancestors);
};
const isWindows = os.platform() === 'win32';
function slash(p) {
  return p.replace(/\\/g, '/');
}
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}
const dynamicImportRE = /\bimport[\s\r\n]*?\(/;
const normallyImporteeRE = /^\.{1,2}\/[.-/\w]+(\.\w+)$/;
const viteIgnoreRE = /\/\*\s*@vite-ignore\s*\*\//;
function hasDynamicImport(code) {
  code = code.replace(singlelineCommentsRE, '').replace(multilineCommentsRE, '');
  return dynamicImportRE.test(code);
}
function toLooseGlob(glob) {
  if (glob.includes('**')) {
    return glob;
  }
  const lastIndex = glob.lastIndexOf('*');
  let tail = '';
  if (lastIndex > -1) {
    tail = glob.slice(lastIndex + 1);
    glob = glob.slice(0, lastIndex + 1);
  }
  if (glob.endsWith('/*')) {
    return `${glob}*/*${tail}`;
  }
  if (glob.endsWith('*')) {
    return [glob + tail, `${glob}/**${tail.startsWith('/') ? tail : `/*${tail}`}`];
  }
  return glob + tail;
}
function mappingPath(paths, alias) {
  console.log(paths);
  const maps = {};
  for (const p of paths) {
    let importee = p;
    if (alias) {
      const [find, replacement] = Object.entries(alias)[0];
      importee = p.replace(find, replacement);
    }
    const ext = path$1.extname(importee);
    maps[p] = [
      importee.endsWith(`/index${ext}`) && importee.replace(`/index${ext}`, ''),
      importee.replace(ext, ''),
      importee,
    ].filter(Boolean);
  }
  return maps;
}
class Resolve {
  constructor(config, resolve = config.createResolver()) {
    this.config = config;
    this.resolve = resolve;
  }
  async tryResolve(importee, importer) {
    return (
      (await this.tryResolveAlias(importee, importer)) || this.tryResolveBare(importee, importer)
    );
  }
  async tryResolveAlias(importee, importer) {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee);
    const resolvedId = await this.resolve(ipte, importer, true);
    if (!resolvedId) {
      return;
    }
    const alias = this.config.resolve.alias.find((a) =>
      a.find instanceof RegExp ? a.find.test(ipte) : ipte.startsWith(`${a.find}/`),
    );
    if (!alias) {
      return;
    }
    const findString = alias.find instanceof RegExp ? alias.find.exec(importee)[0] : alias.find;
    const relativePath = alias.replacement.startsWith('.')
      ? alias.replacement
      : relativeify(path$1.posix.relative(path$1.dirname(importer), alias.replacement));
    const resolvedAlias = {
      ...alias,
      findString,
      relative: findString.endsWith('/')
        ? relativePath.endsWith('/')
          ? relativePath
          : `${relativePath}/`
        : relativePath,
    };
    return {
      type: 'alias',
      ...this.resolveAlias(importeeRaw, importer, resolvedAlias),
    };
  }
  tryResolveBare(importee, importer) {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee);
    if (/^[\.\/]/.test(ipte)) {
      return;
    }
    const paths = ipte.split('/');
    const node_modules = path$1.join(this.config.root, 'node_modules');
    let level = '';
    let find, replacement;
    let p;
    while ((p = paths.shift())) {
      level = path$1.posix.join(level, p);
      const fullPath = path$1.join(node_modules, level);
      if (fs.existsSync(fullPath)) {
        find = level;
        const relativePath = relativeify(
          path$1.posix.relative(path$1.dirname(importer), node_modules),
        );
        replacement = `${relativePath}/${level}`;
      }
    }
    if (!find) {
      return;
    }
    const alias = {
      find,
      replacement,
      findString: find,
      relative: replacement.startsWith('.')
        ? replacement
        : relativeify(path$1.posix.relative(path$1.dirname(importer), replacement)),
    };
    return {
      type: 'bare',
      ...this.resolveAlias(importeeRaw, importer, alias),
    };
  }
  resolveAlias(importee, importer, alias) {
    const { find, replacement } = alias;
    let { importee: ipte, importeeRaw = ipte, startQuotation = '' } = this.parseImportee(importee);
    if (replacement.startsWith('.')) {
      ipte = ipte.replace(find, replacement);
    } else {
      const relativePath = relativeify(
        path$1.posix.relative(path$1.dirname(importer), normalizePath(replacement)),
      );
      ipte = ipte.replace(find instanceof RegExp ? find : `${find}/`, '');
      ipte = `${relativePath}/${ipte}`;
    }
    return {
      alias,
      import: {
        importee: importeeRaw,
        importer,
        resolved: startQuotation + ipte,
      },
    };
  }
  parseImportee(importee) {
    const result = { importee };
    if (/^[`'"]/.test(importee)) {
      result.importee = importee.slice(1);
      result.importeeRaw = importee;
      result.startQuotation = importee.slice(0, 1);
    }
    return result;
  }
}
const example = 'For example: import(`./foo/${bar}.js`).';
function sanitizeString(str) {
  if (str.includes('*')) {
    throw new Error('A dynamic import cannot contain * characters.');
  }
  return str;
}
function templateLiteralToGlob(node) {
  let glob = '';
  for (let i = 0; i < node.quasis.length; i += 1) {
    glob += sanitizeString(node.quasis[i].value.raw);
    if (node.expressions[i]) {
      glob += expressionToGlob(node.expressions[i]);
    }
  }
  return glob;
}
function callExpressionToGlob(node) {
  const { callee } = node;
  if (
    callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier' &&
    callee.property.name === 'concat'
  ) {
    return `${expressionToGlob(callee.object)}${node.arguments.map(expressionToGlob).join('')}`;
  }
  return '*';
}
function binaryExpressionToGlob(node) {
  if (node.operator !== '+') {
    throw new Error(`${node.operator} operator is not supported.`);
  }
  return `${expressionToGlob(node.left)}${expressionToGlob(node.right)}`;
}
function expressionToGlob(node) {
  switch (node.type) {
    case 'TemplateLiteral':
      return templateLiteralToGlob(node);
    case 'CallExpression':
      return callExpressionToGlob(node);
    case 'BinaryExpression':
      return binaryExpressionToGlob(node);
    case 'Literal':
      return sanitizeString(node.value);
    default:
      return '*';
  }
}
async function dynamicImportToGlob(node, sourceString, resolver) {
  let _a;
  let glob = expressionToGlob(node);
  glob = (_a = await (resolver == null ? void 0 : resolver(glob))) != null ? _a : glob;
  if (!glob.includes('*') || glob.startsWith('data:')) {
    return null;
  }
  glob = glob.replace(/\*\*/g, '*');
  // if (glob.startsWith('*')) {
  //   throw new Error(
  //     `invalid import "${sourceString}". It cannot be statically analyzed. Variable dynamic imports must start with ./ and be limited to a specific directory. ${example}`,
  //   );
  // }
  // if (!glob.startsWith("./") && !glob.startsWith("../")) {
  //   throw new Error(
  //     `invalid import "${sourceString}". Variable bare imports are not supported, imports must start with ./ in the static part of the import. ${example}`
  //   );
  // }
  const ownDirectoryStarExtension = /^\.\/\*\.[\w]+$/;
  if (ownDirectoryStarExtension.test(glob)) {
    throw new Error(
      `invalid import "${sourceString}". Variable imports cannot import their own directory, place imports in a separate directory or make the import filename more specific. ${example}`,
    );
  }
  if (path$1.extname(glob) === '') {
    throw new Error(
      `invalid import "${sourceString}". A file extension must be included in the static part of the import. ${example}`,
    );
  }
  return glob;
}
const PLUGIN_NAME = 'vite-plugin-dynamic-import';
function dynamicImport(options = {}) {
  let config;
  let resolve;
  let extensions = DEFAULT_EXTENSIONS;
  return {
    name: PLUGIN_NAME,
    configResolved(_config) {
      let _a;
      config = _config;
      resolve = new Resolve(_config);
      if ((_a = config.resolve) == null ? void 0 : _a.extensions) {
        extensions = config.resolve.extensions;
      }
    },
    async transform(code, id) {
      let _a;
      if (/node_modules\/(?!\.vite\/)/.test(id)) {
        return;
      }
      if (!extensions.includes(path$1.extname(id))) {
        return;
      }
      if (!hasDynamicImport(code)) {
        return;
      }
      if (((_a = options.filter) == null ? void 0 : _a.call(options, id)) === false) {
        return;
      }
      const ast = this.parse(code);
      const ms = new MagicString(code);
      let dynamicImportIndex = 0;
      const runtimeFunctions = [];
      await walk(ast, {
        async ImportExpression(node) {
          let _a2;
          const importStatement = code.slice(node.start, node.end);
          const importeeRaw = code.slice(node.source.start, node.source.end);
          if (viteIgnoreRE.test(importStatement)) {
            return;
          }
          if ((_a2 = options.viteIgnore) == null ? void 0 : _a2.call(options, importeeRaw, id)) {
            ms.overwrite(node.source.start, node.source.start, '/*@vite-ignore*/');
            return;
          }
          if (node.source.type === 'Literal') {
            const importee = importeeRaw.slice(1, -1);
            if (!importee) {
              return;
            }
            if (normallyImporteeRE.test(importee)) {
              return;
            }
            const rsld = await resolve.tryResolve(importee, id);
            if (rsld && normallyImporteeRE.test(rsld.import.resolved)) {
              ms.overwrite(node.start, node.end, `import("${rsld.import.resolved}")`);
              return;
            }
          }
          const globResult = await globFiles(
            node,
            code,
            id,
            resolve,
            extensions,
            options.loose !== false,
          );
          if (!globResult) {
            return;
          }
          // eslint-disable-next-line prefer-const
          let { files, resolved, normally } = globResult;
          files = files.filter((f) => path$1.join(path$1.dirname(id), f) !== id);
          options.onFiles && (files = options.onFiles(files, id) || files);
          if (normally) {
            ms.overwrite(node.start, node.end, `import('${normally}')`);
          } else {
            if (!(files == null ? void 0 : files.length)) {
              return;
            }
            const mapAlias = resolved
              ? { [resolved.alias.relative]: resolved.alias.findString }
              : void 0;
            const maps = mappingPath(files, mapAlias);
            const runtimeName = `__variableDynamicImportRuntime${dynamicImportIndex++}__`;
            const runtimeFn = generateDynamicImportRuntime(maps, runtimeName);
            console.log(runtimeFn);
            ms.overwrite(node.start, node.end, `${runtimeName}(${importeeRaw})`);
            runtimeFunctions.push(runtimeFn);
          }
        },
      });
      if (runtimeFunctions.length) {
        ms.append(
          [
            '// ---- dynamic import runtime functions --S--',
            ...runtimeFunctions,
            '// ---- dynamic import runtime functions --E--',
          ].join('\n'),
        );
      }
      const str = ms.toString();
      return str === code ? null : str;
    },
  };
}
async function globFiles(node, code, importer, resolve, extensions, loose = true) {
  let files;
  let resolved;
  let normally;
  const PAHT_FILL = '####/';
  const EXT_FILL = '.extension';
  let glob;
  let globRaw;
  glob = await dynamicImportToGlob(node.source, code.slice(node.start, node.end), async (raw) => {
    globRaw = raw;
    resolved = await resolve.tryResolve(raw, importer);
    if (resolved) {
      raw = resolved.import.resolved;
    }
    if (!path$1.extname(raw)) {
      raw = raw + EXT_FILL;
    }
    if (/^\.\/\*\.\w+$/.test(raw)) {
      raw = raw.replace('./*', `./${PAHT_FILL}*`);
    }
    return raw;
  });
  if (!glob) {
    if (normallyImporteeRE.test(globRaw)) {
      normally = globRaw;
      return { normally };
    }
    return;
  }
  const globs = [].concat(loose ? toLooseGlob(glob) : glob).map((g) => {
    g.includes(PAHT_FILL) && (g = g.replace(PAHT_FILL, ''));
    g.endsWith(EXT_FILL) && (g = g.replace(EXT_FILL, ''));
    return g;
  });
  const fileGlobs = globs.map((g) =>
    path$1.extname(g) ? g : `${g}.{${extensions.map((e) => e.replace(/^\./, '')).join(',')}}`,
  );
  // eslint-disable-next-line prefer-const
  files = fastGlob
    .sync(fileGlobs, { cwd: path$1.dirname(importer) })
    .map((file) => relativeify(file));
  return { files, resolved };
}
function generateDynamicImportRuntime(maps, name) {
  console.log(maps, name);
  const groups = Object.entries(maps).map(([localFile, importeeList]) =>
    importeeList
      .map((importee) => `    case '${importee.replace('./', '')}':`)
      .concat(`      return import('${localFile.replace('./', '')}');`),
  );
  return `function ${name}(path) {
  return import(path);
  switch (path) {
${groups.flat().join('\n')}
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
  }
}`;
}
export { Resolve, dynamicImport as default, dynamicImportToGlob, mappingPath, toLooseGlob };
