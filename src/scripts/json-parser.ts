export function removeCommentsStringAware(str: string): string {
  let result = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] === '"') {
      result += str[i++];
      while (i < str.length && str[i] !== '"') {
        if (str[i] === '\\') { result += str[i++]; }
        if (i < str.length) { result += str[i++]; }
      }
      if (i < str.length) result += str[i++];
    } else if (str[i] === "'") {
      result += str[i++];
      while (i < str.length && str[i] !== "'") {
        if (str[i] === '\\') { result += str[i++]; }
        if (i < str.length) { result += str[i++]; }
      }
      if (i < str.length) result += str[i++];
    } else if (str[i] === '/' && str[i + 1] === '/') {
      while (i < str.length && str[i] !== '\n') i++;
    } else if (str[i] === '/' && str[i + 1] === '*') {
      i += 2;
      while (i < str.length && !(str[i] === '*' && str[i + 1] === '/')) i++;
      if (i < str.length) i += 2;
    } else {
      result += str[i++];
    }
  }
  return result;
}

export function replaceSingleQuotes(str: string): string {
  let result = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] === '"') {
      result += str[i++];
      while (i < str.length && str[i] !== '"') {
        if (str[i] === '\\') { result += str[i++]; }
        if (i < str.length) { result += str[i++]; }
      }
      if (i < str.length) result += str[i++];
    } else if (str[i] === "'") {
      result += '"';
      i++;
      while (i < str.length && str[i] !== "'") {
        if (str[i] === '\\' && str[i + 1] === "'") {
          result += "'";
          i += 2;
        } else if (str[i] === '"') {
          result += '\\"';
          i++;
        } else if (str[i] === '\\') {
          result += str[i++];
          if (i < str.length) result += str[i++];
        } else {
          result += str[i++];
        }
      }
      result += '"';
      if (i < str.length) i++;
    } else {
      result += str[i++];
    }
  }
  return result;
}

export interface ParseOptions {
  allowUnquotedKeys: boolean;
  allowSingleQuotes: boolean;
  allowTrailingCommas: boolean;
  removeSurroundingQuotes: boolean;
  autoUnescape: boolean;
  allowTrailingSemicolon: boolean;
  removeComments: boolean;
}

export function parseJsonLeniently(jsonString: string, options: ParseOptions): any {
  let processedJson = jsonString.trim();

  if (options.removeComments) {
    processedJson = removeCommentsStringAware(processedJson);
  }

  if (options.allowTrailingSemicolon) {
    processedJson = processedJson.replace(/;\s*$/, '');
  }

  if (options.removeSurroundingQuotes) {
    if (
      (processedJson.startsWith('"') && processedJson.endsWith('"')) ||
      (processedJson.startsWith("'") && processedJson.endsWith("'"))
    ) {
      const inner = processedJson.slice(1, -1);
      if (inner.startsWith('{') || inner.startsWith('[')) {
        processedJson = inner;
      }
    }
  }

  if (options.autoUnescape && processedJson.includes('\\"')) {
    try {
      const candidate = JSON.parse('"' + processedJson + '"');
      if (candidate.startsWith('{') || candidate.startsWith('[')) {
        processedJson = candidate;
      }
    } catch (_) {
      processedJson = processedJson
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
    }
  }

  if (options.allowSingleQuotes) {
    processedJson = replaceSingleQuotes(processedJson);
  }

  if (options.allowUnquotedKeys) {
    processedJson = processedJson.replace(
      /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
      '$1"$2":'
    );
  }

  if (options.allowTrailingCommas) {
    processedJson = processedJson.replace(/,(\s*[}\]])/g, '$1');
  }

  return JSON.parse(processedJson);
}

export function jsonToYaml(obj: any, indent = 0): string {
  const spaces = '  '.repeat(indent);

  if (obj === null) return 'null';
  if (typeof obj === 'string') return `"${obj}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj
      .map((item) => `${spaces}- ${jsonToYaml(item, indent + 1)}`)
      .join('\n');
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    return keys
      .map((key) => `${spaces}${key}: ${jsonToYaml(obj[key], indent + 1)}`)
      .join('\n');
  }

  return String(obj);
}

export function jsonToXml(obj: any, rootName = 'root'): string {
  function objectToXml(obj: any, nodeName: string): string {
    if (obj === null) return `<${nodeName}></${nodeName}>`;
    if (typeof obj === 'string')
      return `<${nodeName}>${escapeXml(obj)}</${nodeName}>`;
    if (typeof obj === 'number' || typeof obj === 'boolean')
      return `<${nodeName}>${obj}</${nodeName}>`;

    if (Array.isArray(obj)) {
      return obj
        .map((item, index) => objectToXml(item, `${nodeName}_${index}`))
        .join('');
    }

    if (typeof obj === 'object') {
      const inner = Object.keys(obj)
        .map((key) => objectToXml(obj[key], key))
        .join('');
      return `<${nodeName}>${inner}</${nodeName}>`;
    }

    return `<${nodeName}>${obj}</${nodeName}>`;
  }

  function escapeXml(str: string): string {
    return str.replace(/[<>&'"]/g, function (char) {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return char;
      }
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${objectToXml(obj, rootName)}`;
}

export function jsonToCsv(obj: any, errorMsg: string): string {
  if (!Array.isArray(obj)) {
    throw new Error(errorMsg);
  }

  if (obj.length === 0) return '';

  const keys = new Set<string>();
  obj.forEach((item) => {
    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach((key) => keys.add(key));
    }
  });

  const keyArray = Array.from(keys);
  const header = keyArray.map((key) => `"${key}"`).join(',');

  const rows = obj.map((item) => {
    return keyArray
      .map((key) => {
        const value = item && typeof item === 'object' ? item[key] : '';
        return `"${String(value || '').replace(/"/g, '""')}"`;
      })
      .join(',');
  });

  return [header, ...rows].join('\n');
}
