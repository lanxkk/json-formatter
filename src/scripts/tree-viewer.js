// 树状视图类 - 用于将JSON数据渲染为可交互的树结构
class TreeViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.data = null;
    this.expandedPaths = new Set();
    this.searchTerm = '';
    this.editingPath = null;
  }

  /**
   * 渲染JSON数据为树结构
   * @param {*} jsonData - 要渲染的JSON数据
   */
  render(jsonData) {
    this.data = jsonData;
    if (!this.container) return;

    this.container.innerHTML = '';

    if (jsonData === null || jsonData === undefined) {
      this.container.innerHTML = '<div class="tree-empty">无数据</div>';
      return;
    }

    const tree = this.buildTreeNode(null, jsonData, '', 0);
    this.container.innerHTML = tree;
    this.attachEventListeners();
  }

  /**
   * 构建树节点HTML
   * @param {string} key - 节点键名
   * @param {*} value - 节点值
   * @param {string} path - 节点路径
   * @param {number} depth - 节点深度
   * @returns {string} 节点HTML字符串
   */
  buildTreeNode(key, value, path, depth) {
    const type = this.getValueType(value);
    const isExpandable = type === 'object' || type === 'array';
    const isExpanded = this.expandedPaths.has(path);
    const indent = depth * 20;

    // 检查键名和值是否匹配搜索词
    const keyMatches =
      this.searchTerm &&
      key !== null &&
      String(key).toLowerCase().includes(this.searchTerm);
    const valueMatches =
      this.searchTerm &&
      type !== 'object' &&
      type !== 'array' &&
      value !== null &&
      value !== undefined &&
      String(value).toLowerCase().includes(this.searchTerm);

    // 调试日志
    if (keyMatches || valueMatches) {
      console.log('✅ 匹配:', { key, value: type === 'object' || type === 'array' ? `[${type}]` : value, keyMatches, valueMatches });
    }

    let html = '';

    if (type === 'object') {
      const keys = Object.keys(value);
      const preview = isExpanded
        ? ''
        : `{${keys.length} ${keys.length === 1 ? 'key' : 'keys'}}`;

      html += `<div class="tree-node" data-path="${this.escapeHtml(
        path
      )}" style="padding-left: ${indent}px;">`;

      // 展开/折叠图标
      html += `<span class="tree-toggle ${
        isExpanded ? 'expanded' : ''
      }" data-path="${this.escapeHtml(path)}">
        ${isExpanded ? '▼' : '▶'}
      </span>`;

      // 键名（带高亮）
      if (key !== null) {
        const keyClass = keyMatches ? 'tree-key search-highlight' : 'tree-key';
        html += `<span class="${keyClass}">"${this.escapeHtml(key)}"</span>: `;
      }

      // 对象括号和预览
      html += `<span class="tree-bracket">{</span>`;
      if (!isExpanded) {
        html += `<span class="tree-preview">${preview}</span><span class="tree-bracket">}</span>`;
      }

      // 复制路径按钮
      html += `<button class="tree-copy-path" data-path="${this.escapeHtml(
        path
      )}" title="复制路径">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>`;

      html += '</div>';

      // 子节点
      if (isExpanded) {
        keys.forEach((k, index) => {
          const childPath = path ? `${path}.${k}` : k;
          html += this.buildTreeNode(k, value[k], childPath, depth + 1);
        });

        // 闭合括号
        html += `<div class="tree-node" style="padding-left: ${indent}px;">`;
        html += `<span class="tree-bracket">}</span>`;
        html += '</div>';
      }
    } else if (type === 'array') {
      const length = value.length;
      const preview = isExpanded
        ? ''
        : `[${length} ${length === 1 ? 'item' : 'items'}]`;

      html += `<div class="tree-node" data-path="${this.escapeHtml(
        path
      )}" style="padding-left: ${indent}px;">`;

      // 展开/折叠图标
      html += `<span class="tree-toggle ${
        isExpanded ? 'expanded' : ''
      }" data-path="${this.escapeHtml(path)}">
        ${isExpanded ? '▼' : '▶'}
      </span>`;

      // 键名（带高亮）
      if (key !== null) {
        const keyClass = keyMatches ? 'tree-key search-highlight' : 'tree-key';
        html += `<span class="${keyClass}">"${this.escapeHtml(key)}"</span>: `;
      }

      // 数组括号和预览
      html += `<span class="tree-bracket">[</span>`;
      if (!isExpanded) {
        html += `<span class="tree-preview">${preview}</span><span class="tree-bracket">]</span>`;
      }

      // 复制路径按钮
      html += `<button class="tree-copy-path" data-path="${this.escapeHtml(
        path
      )}" title="复制路径">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>`;

      html += '</div>';

      // 子节点
      if (isExpanded) {
        value.forEach((item, index) => {
          const childPath = `${path}[${index}]`;
          html += this.buildTreeNode(
            index.toString(),
            item,
            childPath,
            depth + 1
          );
        });

        // 闭合括号
        html += `<div class="tree-node" style="padding-left: ${indent}px;">`;
        html += `<span class="tree-bracket">]</span>`;
        html += '</div>';
      }
    } else {
      // 基本类型
      html += `<div class="tree-node tree-leaf" data-path="${this.escapeHtml(
        path
      )}" style="padding-left: ${indent}px;">`;

      // 键名（带高亮）
      if (key !== null) {
        const keyClass = keyMatches ? 'tree-key search-highlight' : 'tree-key';
        html += `<span class="${keyClass}">"${this.escapeHtml(key)}"</span>: `;
      }

      // 值（可编辑，带高亮）
      const valueClass = valueMatches
        ? `tree-value tree-value-${type} search-highlight`
        : `tree-value tree-value-${type}`;
      html += `<span class="${valueClass}" data-path="${this.escapeHtml(
        path
      )}" data-type="${type}">`;
      if (type === 'string') {
        html += `"${this.escapeHtml(value)}"`;
      } else if (type === 'null') {
        html += 'null';
      } else {
        html += this.escapeHtml(String(value));
      }
      html += `</span>`;

      // 复制路径按钮
      html += `<button class="tree-copy-path" data-path="${this.escapeHtml(
        path
      )}" title="复制路径">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>`;

      html += '</div>';
    }

    return html;
  }

  /**
   * 附加事件监听器
   */
  attachEventListeners() {
    // 展开/折叠
    this.container.querySelectorAll('.tree-toggle').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const path = toggle.getAttribute('data-path');
        this.toggleNode(path);
      });
    });

    // 复制路径
    this.container.querySelectorAll('.tree-copy-path').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const path = btn.getAttribute('data-path');
        this.copyPath(path);
      });
    });

    // 双击编辑值
    this.container.querySelectorAll('.tree-value').forEach((valueEl) => {
      valueEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const path = valueEl.getAttribute('data-path');
        const type = valueEl.getAttribute('data-type');
        this.enableEdit(path, valueEl, type);
      });
    });
  }

  /**
   * 展开/折叠节点
   * @param {string} path - 节点路径
   */
  toggleNode(path) {
    if (this.expandedPaths.has(path)) {
      this.expandedPaths.delete(path);
    } else {
      this.expandedPaths.add(path);
    }
    this.render(this.data);
  }

  /**
   * 全部展开
   */
  expandAll() {
    this.expandedPaths.clear();
    this.collectAllPaths(this.data, '', this.expandedPaths);
    this.render(this.data);
  }

  /**
   * 全部折叠
   */
  collapseAll() {
    this.expandedPaths.clear();
    this.render(this.data);
  }

  /**
   * 收集所有可展开的路径
   */
  collectAllPaths(obj, currentPath, pathSet) {
    if (obj && typeof obj === 'object') {
      // 添加当前路径（包括空字符串，即根节点）
      pathSet.add(currentPath);

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const newPath = currentPath
            ? `${currentPath}[${index}]`
            : `[${index}]`;
          this.collectAllPaths(item, newPath, pathSet);
        });
      } else {
        Object.keys(obj).forEach((key) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          this.collectAllPaths(obj[key], newPath, pathSet);
        });
      }
    }
  }

  /**
   * 搜索过滤
   * @param {string} term - 搜索词
   */
  search(term) {
    this.searchTerm = term.toLowerCase().trim();
    console.log('🔍 搜索词:', this.searchTerm); // 调试日志
    
    if (this.searchTerm) {
      // 展开包含匹配项的所有父节点
      this.expandedPaths.clear();
      this.expandMatchingPaths(this.data, '');
    } else {
      // 如果搜索词为空，保持当前展开状态
      // 不需要清空 expandedPaths
    }
    
    this.render(this.data);
  }

  /**
   * 展开匹配路径
   */
  expandMatchingPaths(obj, currentPath) {
    if (!obj || typeof obj !== 'object') {
      // 检查基本类型的值是否匹配
      if (this.searchTerm) {
        const valueStr = String(obj).toLowerCase();
        return valueStr.includes(this.searchTerm);
      }
      return false;
    }

    let hasMatch = false;

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
        if (this.expandMatchingPaths(item, newPath)) {
          hasMatch = true;
          // 添加当前路径，包括空字符串（根节点）
          this.expandedPaths.add(currentPath);
        }
      });
    } else {
      Object.keys(obj).forEach((key) => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        // 检查键名是否匹配
        if (key.toLowerCase().includes(this.searchTerm)) {
          hasMatch = true;
          // 添加当前路径，包括空字符串（根节点）
          this.expandedPaths.add(currentPath);
        }

        // 递归检查子节点
        if (this.expandMatchingPaths(obj[key], newPath)) {
          hasMatch = true;
          // 添加当前路径，包括空字符串（根节点）
          this.expandedPaths.add(currentPath);
        }
      });
    }

    return hasMatch;
  }

  /**
   * 检查是否匹配搜索
   */
  matchesSearch(key, value) {
    if (!this.searchTerm) return false;

    // 检查键名是否匹配
    const keyMatch =
      key !== null && String(key).toLowerCase().includes(this.searchTerm);

    // 对于对象和数组，只匹配键名，不匹配值
    const type = this.getValueType(value);
    if (type === 'object' || type === 'array') {
      return keyMatch;
    }

    // 对于基本类型，同时匹配键名和值
    const valueMatch =
      value !== null &&
      value !== undefined &&
      String(value).toLowerCase().includes(this.searchTerm);

    return keyMatch || valueMatch;
  }

  /**
   * 复制路径
   * @param {string} path - 要复制的路径
   */
  async copyPath(path) {
    try {
      await navigator.clipboard.writeText(path || 'root');

      // 显示复制成功提示
      if (typeof showSuccess === 'function') {
        showSuccess(`已复制路径: ${path || 'root'}`);
      }
    } catch (error) {
      console.error('复制失败:', error);
      if (typeof showError === 'function') {
        showError('复制失败');
      }
    }
  }

  /**
   * 启用编辑
   * @param {string} path - 节点路径
   * @param {HTMLElement} element - 要编辑的元素
   * @param {string} type - 值类型
   */
  enableEdit(path, element, type) {
    if (this.editingPath) return; // 已经在编辑中

    this.editingPath = path;
    const currentValue = this.getValueByPath(this.data, path);

    // 获取不带引号的原始值
    let editValue = currentValue;
    if (type === 'string') {
      editValue = currentValue;
    }

    element.setAttribute('contenteditable', 'true');
    element.classList.add('editing');
    element.textContent = editValue;
    element.focus();

    // 选中所有文本
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // 保存编辑
    const saveEdit = () => {
      const newValue = element.textContent;
      this.saveEdit(path, newValue, type);
      element.removeAttribute('contenteditable');
      element.classList.remove('editing');
      this.editingPath = null;
    };

    // 取消编辑
    const cancelEdit = () => {
      element.removeAttribute('contenteditable');
      element.classList.remove('editing');
      this.editingPath = null;
      this.render(this.data);
    };

    // 键盘事件
    const keyHandler = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveEdit();
        element.removeEventListener('keydown', keyHandler);
        element.removeEventListener('blur', blurHandler);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancelEdit();
        element.removeEventListener('keydown', keyHandler);
        element.removeEventListener('blur', blurHandler);
      }
    };

    // 失焦事件
    const blurHandler = () => {
      saveEdit();
      element.removeEventListener('keydown', keyHandler);
      element.removeEventListener('blur', blurHandler);
    };

    element.addEventListener('keydown', keyHandler);
    element.addEventListener('blur', blurHandler);
  }

  /**
   * 保存编辑
   * @param {string} path - 节点路径
   * @param {string} newValue - 新值
   * @param {string} type - 值类型
   */
  saveEdit(path, newValue, type) {
    try {
      let parsedValue = newValue;

      // 根据类型解析值
      if (type === 'number') {
        parsedValue = Number(newValue);
        if (isNaN(parsedValue)) {
          throw new Error('无效的数字');
        }
      } else if (type === 'boolean') {
        if (newValue.toLowerCase() === 'true') {
          parsedValue = true;
        } else if (newValue.toLowerCase() === 'false') {
          parsedValue = false;
        } else {
          throw new Error('布尔值只能是 true 或 false');
        }
      } else if (type === 'null') {
        if (newValue.toLowerCase() !== 'null') {
          throw new Error('null 值不能更改为其他类型');
        }
        parsedValue = null;
      }
      // string 类型保持原样

      // 更新数据
      this.setValueByPath(this.data, path, parsedValue);

      // 重新渲染
      this.render(this.data);

      // 触发数据更新事件
      if (typeof window.onTreeDataUpdate === 'function') {
        window.onTreeDataUpdate(this.data);
      }

      if (typeof showSuccess === 'function') {
        showSuccess('值已更新');
      }
    } catch (error) {
      if (typeof showError === 'function') {
        showError(`更新失败: ${error.message}`);
      }
      this.render(this.data);
    }
  }

  /**
   * 根据路径获取值
   * @param {*} obj - 对象
   * @param {string} path - 路径
   * @returns {*} 值
   */
  getValueByPath(obj, path) {
    if (!path) return obj;

    const parts = this.parsePath(path);
    let current = obj;

    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }

    return current;
  }

  /**
   * 根据路径设置值
   * @param {*} obj - 对象
   * @param {string} path - 路径
   * @param {*} value - 新值
   */
  setValueByPath(obj, path, value) {
    if (!path) return;

    const parts = this.parsePath(path);
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = value;
  }

  /**
   * 解析路径为数组
   * @param {string} path - 路径字符串
   * @returns {Array} 路径数组
   */
  parsePath(path) {
    const parts = [];
    let current = '';
    let inBracket = false;

    for (let i = 0; i < path.length; i++) {
      const char = path[i];

      if (char === '[') {
        if (current) {
          parts.push(current);
          current = '';
        }
        inBracket = true;
      } else if (char === ']') {
        if (inBracket && current) {
          parts.push(parseInt(current));
          current = '';
        }
        inBracket = false;
      } else if (char === '.' && !inBracket) {
        if (current) {
          parts.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      parts.push(inBracket ? parseInt(current) : current);
    }

    return parts;
  }

  /**
   * 获取值类型
   * @param {*} value - 值
   * @returns {string} 类型
   */
  getValueType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'unknown';
  }

  /**
   * HTML转义
   * @param {string} str - 要转义的字符串
   * @returns {string} 转义后的字符串
   */
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 获取当前数据
   * @returns {*} 当前数据
   */
  getData() {
    return this.data;
  }
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TreeViewer;
}

// ES6 默认导出
export default TreeViewer;
