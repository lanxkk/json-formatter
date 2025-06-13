// JSON格式化工具脚本

// 全局状态
let currentTab = 'format';

// 处理不带引号的键名
function normalizeKeys(input) {
  const allowUnquotedKeys = document.getElementById('allow-unquoted-keys')?.checked;
  
  if (!allowUnquotedKeys) {
    return input;
  }
  
  try {
    // 改进的正则表达式，支持更复杂的情况
    // 匹配模式：在对象开始或逗号后，匹配不带引号的键名
    let normalized = input;
    
    // 处理对象开始后的键名：{ key:
    normalized = normalized.replace(/(\{\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
    
    // 处理逗号后的键名：, key:
    normalized = normalized.replace(/(,\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
    
    // 处理换行后的键名（多行格式）
    normalized = normalized.replace(/(\n\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
    
    return normalized;
  } catch (error) {
    console.warn('键名规范化失败，使用原始输入：', error);
    return input;
  }
}

// 处理单引号字符串
function normalizeSingleQuotes(input) {
  const allowSingleQuotes = document.getElementById('allow-single-quotes')?.checked;
  
  if (!allowSingleQuotes) {
    return input;
  }
  
  try {
    // 使用更简洁和可靠的正则表达式方法
    // 匹配单引号字符串，但要确保不在双引号内
    let result = input;
    
    // 匹配单引号包围的字符串，处理转义字符
    result = result.replace(/'((?:[^'\\]|\\.)*)'/g, (match, content) => {
      // 将内容中的双引号转义
      const escapedContent = content.replace(/"/g, '\\"');
      return `"${escapedContent}"`;
    });
    
    return result;
  } catch (error) {
    console.warn('单引号规范化失败，使用原始输入：', error);
    return input;
  }
}

// 处理尾随逗号
function normalizeTrailingCommas(input) {
  const allowTrailingCommas = document.getElementById('allow-trailing-commas')?.checked;
  
  if (!allowTrailingCommas) {
    return input;
  }
  
  try {
    // 使用更简洁的正则表达式方法处理尾随逗号
    // 这个方法先移除字符串内容，然后处理尾随逗号，最后恢复字符串
    
    // 先保存所有字符串内容
    const strings = [];
    let stringIndex = 0;
    
    // 替换所有字符串为占位符
    let withoutStrings = input.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (match) => {
      strings.push(match);
      return `__STRING_${stringIndex++}__`;
    });
    
    // 处理单引号字符串（如果已经处理过单引号的话，这里就不会有单引号字符串了）
    withoutStrings = withoutStrings.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match) => {
      strings.push(match);
      return `__STRING_${stringIndex++}__`;
    });
    
    // 移除对象和数组中的尾随逗号
    // 匹配：逗号 + 可能的空白字符 + 对象或数组结束符
    withoutStrings = withoutStrings.replace(/,(\s*[}\]])/g, '$1');
    
    // 恢复字符串内容
    stringIndex = 0;
    const result = withoutStrings.replace(/__STRING_\d+__/g, () => {
      return strings[stringIndex++] || '';
    });
    
    return result;
  } catch (error) {
    console.warn('尾随逗号规范化失败，使用原始输入：', error);
    return input;
  }
}

// 综合的输入规范化函数
function normalizeInput(input) {
  try {
    // 处理顺序：尾随逗号 -> 单引号 -> 不带引号的键名
    let normalized = input;
    normalized = normalizeTrailingCommas(normalized);
    normalized = normalizeSingleQuotes(normalized);
    normalized = normalizeKeys(normalized);
    return normalized;
  } catch (error) {
    console.warn('输入规范化失败，使用原始输入：', error);
    return input;
  }
}

// 工具函数
function showError(message) {
  const errorText = document.getElementById('error-text');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');
  
  if (errorText && errorMessage && successMessage) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
  }
}

function showSuccess(message) {
  const successText = document.getElementById('success-text');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  
  if (successText && successMessage && errorMessage) {
    successText.textContent = message;
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }
}

function hideMessages() {
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');
  
  if (errorMessage && successMessage) {
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
  }
}

function updateInputStatus() {
  const inputTextarea = document.getElementById('input-json');
  const inputStatus = document.getElementById('input-status');
  
  if (inputTextarea && inputStatus) {
    const text = inputTextarea.value;
    const lines = text.split('\n').length;
    const chars = text.length;
    inputStatus.textContent = `${lines} 行, ${chars} 字符`;
  }
}

function updateOutputStatus() {
  const outputTextarea = document.getElementById('output-json');
  const outputStatus = document.getElementById('output-status');
  
  if (outputTextarea && outputStatus) {
    const text = outputTextarea.value;
    const lines = text.split('\n').length;
    const chars = text.length;
    outputStatus.textContent = `${lines} 行, ${chars} 字符`;
  }
}

// JSON 处理函数
function formatJson() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入JSON数据');
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    const formatted = JSON.stringify(parsed, null, 2);
    outputTextarea.value = formatted;
    updateOutputStatus();
    showSuccess('JSON格式化成功！');
  } catch (error) {
    showError(`JSON格式化失败：${error.message}`);
  }
}

function compressJson() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入JSON数据');
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    const compressed = JSON.stringify(parsed);
    outputTextarea.value = compressed;
    updateOutputStatus();
    showSuccess('JSON压缩成功！');
  } catch (error) {
    showError(`JSON压缩失败：${error.message}`);
  }
}

function unescapeJson() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入需要去转义的数据');
    }
    
    // 处理常见的转义字符
    let unescaped = input
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\b/g, '\b')
      .replace(/\\f/g, '\f');
    
    outputTextarea.value = unescaped;
    updateOutputStatus();
    showSuccess('去转义成功！');
  } catch (error) {
    showError(`去转义失败：${error.message}`);
  }
}

function validateJson() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      outputTextarea.value = '请输入JSON数据进行验证';
      return;
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    const info = {
      valid: true,
      type: Array.isArray(parsed) ? 'Array' : typeof parsed,
      keys: typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0,
      size: JSON.stringify(parsed).length
    };
    
    outputTextarea.value = `✅ JSON验证通过！

类型: ${info.type}
${info.type === 'object' ? `属性数量: ${info.keys}` : ''}
${info.type === 'Array' ? `数组长度: ${parsed.length}` : ''}
数据大小: ${info.size} 字符

格式化预览:
${JSON.stringify(parsed, null, 2)}`;
    
    updateOutputStatus();
    showSuccess('JSON验证通过！');
  } catch (error) {
    outputTextarea.value = `❌ JSON验证失败

错误信息: ${error.message}

常见问题：
1. 检查是否有多余的逗号
2. 检查引号是否配对
3. 检查括号是否配对
4. 检查属性名是否用双引号包围
5. 如果使用了不带引号的键名，请勾选"允许不带引号的键名"选项
6. 如果使用了单引号字符串，请勾选"允许使用单引号"选项
7. 如果最后一项后面有逗号，请勾选"允许尾随逗号（最后一项后面有逗号）"选项`;
    
    updateOutputStatus();
    showError(`JSON验证失败：${error.message}`);
  }
}

// 转换功能（基础版本，不依赖外部库）
function convertToYaml() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入JSON数据');
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    // 简单的YAML转换（基础版本）
    const yamlString = JSON.stringify(parsed, null, 2)
      .replace(/"/g, '')
      .replace(/,$/gm, '')
      .replace(/^\s*[\{\[]/gm, '')
      .replace(/^\s*[\}\]]/gm, '');
    
    outputTextarea.value = yamlString;
    updateOutputStatus();
    showSuccess('转换为YAML成功！');
  } catch (error) {
    showError(`转换为YAML失败：${error.message}`);
  }
}

function convertToXml() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入JSON数据');
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    
    // 简单的XML转换
    function jsonToXml(obj, rootName = 'root') {
      if (typeof obj !== 'object' || obj === null) {
        return `<${rootName}>${obj}</${rootName}>`;
      }
      
      let xml = `<${rootName}>`;
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          xml += jsonToXml(value, key);
        } else {
          xml += `<${key}>${value}</${key}>`;
        }
      }
      xml += `</${rootName}>`;
      return xml;
    }
    
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsonToXml(parsed);
    outputTextarea.value = xmlString;
    updateOutputStatus();
    showSuccess('转换为XML成功！');
  } catch (error) {
    showError(`转换为XML失败：${error.message}`);
  }
}

function convertToCsv() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (!inputTextarea || !outputTextarea) return;
  
  try {
    const input = inputTextarea.value.trim();
    if (!input) {
      throw new Error('请输入JSON数据');
    }
    
    // 处理不带引号的键名
    const normalizedInput = normalizeInput(input);
    const parsed = JSON.parse(normalizedInput);
    
    // 确保是数组格式
    let dataArray = Array.isArray(parsed) ? parsed : [parsed];
    
    if (dataArray.length === 0) {
      throw new Error('数据为空');
    }
    
    // 获取所有字段
    const headers = new Set();
    dataArray.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => headers.add(key));
      }
    });
    
    const headerArray = Array.from(headers);
    
    // 生成CSV
    let csv = headerArray.join(',') + '\n';
    dataArray.forEach(item => {
      const row = headerArray.map(header => {
        const value = item[header];
        if (value === undefined || value === null) return '';
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csv += row.join(',') + '\n';
    });
    
    outputTextarea.value = csv;
    updateOutputStatus();
    showSuccess('转换为CSV成功！');
  } catch (error) {
    showError(`转换为CSV失败：${error.message}`);
  }
}

// 文件操作
function importFile() {
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.click();
  }
}

function exportFile() {
  const outputTextarea = document.getElementById('output-json');
  if (!outputTextarea) return;
  
  const content = outputTextarea.value;
  if (!content) {
    showError('没有内容可以导出');
    return;
  }
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `json-formatter-result-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showSuccess('文件导出成功！');
}

function copyToClipboard() {
  const outputTextarea = document.getElementById('output-json');
  if (!outputTextarea) return;
  
  const content = outputTextarea.value;
  if (!content) {
    showError('没有内容可以复制');
    return;
  }
  
  navigator.clipboard.writeText(content).then(() => {
    showSuccess('已复制到剪贴板！');
  }).catch(() => {
    showError('复制失败，请手动复制');
  });
}

function clearAll() {
  const inputTextarea = document.getElementById('input-json');
  const outputTextarea = document.getElementById('output-json');
  
  if (inputTextarea && outputTextarea) {
    inputTextarea.value = '';
    outputTextarea.value = '';
    updateInputStatus();
    updateOutputStatus();
    hideMessages();
  }
}

// 标签页切换
function switchTab(tabName) {
  currentTab = tabName;
  
  // 更新标签页样式
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeTab = document.getElementById(`${tabName}-tab`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
  
  // 显示/隐藏转换选项
  const convertOptions = document.getElementById('convert-options');
  if (convertOptions) {
    if (tabName === 'convert') {
      convertOptions.classList.remove('hidden');
    } else {
      convertOptions.classList.add('hidden');
    }
  }
  
  // 自动处理
  processInput();
}

function processInput() {
  hideMessages();
  
  switch (currentTab) {
    case 'format':
      formatJson();
      break;
    case 'compress':
      compressJson();
      break;
    case 'unescape':
      unescapeJson();
      break;
    case 'validate':
      validateJson();
      break;
    case 'convert':
      // 转换需要手动点击按钮
      break;
  }
}

// 初始化函数
function initJsonFormatter() {
  // 标签页点击事件
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.dataset && target.dataset.tab) {
        switchTab(target.dataset.tab);
      }
    });
  });

  // 输入变化监听
  const inputTextarea = document.getElementById('input-json');
  if (inputTextarea) {
    inputTextarea.addEventListener('input', () => {
      updateInputStatus();
      if (currentTab !== 'convert') {
        processInput();
      }
    });
  }

  // 配置选项监听
  const allowUnquotedKeysCheckbox = document.getElementById('allow-unquoted-keys');
  if (allowUnquotedKeysCheckbox) {
    allowUnquotedKeysCheckbox.addEventListener('change', () => {
      if (currentTab !== 'convert') {
        processInput();
      }
    });
  }

  const allowSingleQuotesCheckbox = document.getElementById('allow-single-quotes');
  if (allowSingleQuotesCheckbox) {
    allowSingleQuotesCheckbox.addEventListener('change', () => {
      if (currentTab !== 'convert') {
        processInput();
      }
    });
  }

  const allowTrailingCommasCheckbox = document.getElementById('allow-trailing-commas');
  if (allowTrailingCommasCheckbox) {
    allowTrailingCommasCheckbox.addEventListener('change', () => {
      if (currentTab !== 'convert') {
        processInput();
      }
    });
  }

  // 按钮事件
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const importBtn = document.getElementById('import-btn');
  const exportBtn = document.getElementById('export-btn');
  
  if (clearBtn) clearBtn.addEventListener('click', clearAll);
  if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);
  if (importBtn) importBtn.addEventListener('click', importFile);
  if (exportBtn) exportBtn.addEventListener('click', exportFile);

  // 转换按钮
  document.querySelectorAll('.convert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.dataset && target.dataset.format) {
        const format = target.dataset.format;
        switch (format) {
          case 'yaml':
            convertToYaml();
            break;
          case 'xml':
            convertToXml();
            break;
          case 'csv':
            convertToCsv();
            break;
        }
      }
    });
  });

  // 文件输入
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const target = e.target;
      if (target && target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          const inputTextarea = document.getElementById('input-json');
          if (result && inputTextarea) {
            inputTextarea.value = result.toString();
            updateInputStatus();
            processInput();
          }
        };
        reader.readAsText(file);
      }
    });
  }

  // 初始化状态
  updateInputStatus();
  updateOutputStatus();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initJsonFormatter);