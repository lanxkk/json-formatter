type ValueType = 'null' | 'array' | 'object' | 'string' | 'number' | 'boolean' | 'unknown';

interface TreeViewerCallbacks {
  showSuccess?: (msg: string) => void;
  showError?: (msg: string) => void;
  onDataUpdate?: (data: any) => void;
}

const COPY_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

export default class TreeViewer {
  container: HTMLElement | null;
  data: any;
  expandedPaths: Set<string>;
  searchTerm: string;
  editingPath: string | null;
  callbacks: TreeViewerCallbacks;
  private nodeMap: Map<string, HTMLElement> = new Map();

  constructor(containerId: string, callbacks: TreeViewerCallbacks = {}) {
    this.container = document.getElementById(containerId);
    this.data = null;
    this.expandedPaths = new Set();
    this.searchTerm = '';
    this.editingPath = null;
    this.callbacks = callbacks;
  }

  render(jsonData: any) {
    this.data = jsonData;
    if (!this.container) return;

    this.container.textContent = '';
    this.nodeMap.clear();

    if (jsonData === null || jsonData === undefined) {
      const empty = document.createElement('div');
      empty.className = 'tree-empty';
      empty.textContent = '—';
      this.container.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    this.buildTreeDOM(null, jsonData, '', 0, fragment);
    this.container.appendChild(fragment);
  }

  private buildTreeDOM(
    key: string | null, value: any, path: string, depth: number,
    parent: Node
  ) {
    const type = this.getValueType(value);
    const indent = depth * 20;

    const keyMatches = !!(this.searchTerm && key !== null &&
      String(key).toLowerCase().includes(this.searchTerm));
    const valueMatches = !!(this.searchTerm &&
      type !== 'object' && type !== 'array' &&
      value !== null && value !== undefined &&
      String(value).toLowerCase().includes(this.searchTerm));

    if (type === 'object' || type === 'array') {
      this.buildContainerNode(key, value, path, depth, indent, type, keyMatches, parent);
    } else {
      this.buildLeafNode(key, value, path, indent, type, keyMatches, valueMatches, parent);
    }
  }

  private buildContainerNode(
    key: string | null, value: any, path: string, depth: number,
    indent: number, type: 'object' | 'array',
    keyMatches: boolean, parent: Node
  ) {
    const isObject = type === 'object';
    const keys = isObject ? Object.keys(value) : null;
    const count = isObject ? keys!.length : value.length;
    const isExpanded = this.expandedPaths.has(path);

    const wrapper = document.createElement('div');
    wrapper.className = 'tree-group';
    wrapper.dataset.path = path;
    this.nodeMap.set(path, wrapper);

    const row = document.createElement('div');
    row.className = 'tree-node';
    row.style.paddingLeft = `${indent}px`;

    const toggle = document.createElement('span');
    toggle.className = `tree-toggle${isExpanded ? ' expanded' : ''}`;
    toggle.textContent = isExpanded ? '▼' : '▶';
    toggle.addEventListener('click', (e) => { e.stopPropagation(); this.toggleNode(path); });
    row.appendChild(toggle);

    if (key !== null) {
      row.appendChild(this.createKey(key, keyMatches));
      row.appendChild(document.createTextNode(': '));
    }

    const openBracket = document.createElement('span');
    openBracket.className = 'tree-bracket';
    openBracket.textContent = isObject ? '{' : '[';
    row.appendChild(openBracket);

    const preview = document.createElement('span');
    preview.className = 'tree-preview';
    const unit = isObject
      ? (count === 1 ? 'key' : 'keys')
      : (count === 1 ? 'item' : 'items');
    preview.textContent = isObject ? `{${count} ${unit}}` : `[${count} ${unit}]`;
    preview.style.display = isExpanded ? 'none' : '';
    row.appendChild(preview);

    const closeBracketInline = document.createElement('span');
    closeBracketInline.className = 'tree-bracket';
    closeBracketInline.textContent = isObject ? '}' : ']';
    closeBracketInline.style.display = isExpanded ? 'none' : '';
    row.appendChild(closeBracketInline);

    row.appendChild(this.createCopyButton(path));
    wrapper.appendChild(row);

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'tree-children';
    childrenContainer.style.display = isExpanded ? '' : 'none';

    if (isExpanded) {
      this.populateChildren(childrenContainer, value, path, depth, isObject, keys);
    }

    const closeRow = document.createElement('div');
    closeRow.className = 'tree-node';
    closeRow.style.paddingLeft = `${indent}px`;
    closeRow.style.display = isExpanded ? '' : 'none';
    const closeBracketBlock = document.createElement('span');
    closeBracketBlock.className = 'tree-bracket';
    closeBracketBlock.textContent = isObject ? '}' : ']';
    closeRow.appendChild(closeBracketBlock);

    childrenContainer.appendChild(closeRow);
    wrapper.appendChild(childrenContainer);
    parent.appendChild(wrapper);
  }

  private populateChildren(
    container: HTMLElement, value: any, path: string, depth: number,
    isObject: boolean, keys: string[] | null
  ) {
    if (isObject) {
      keys!.forEach((k) => {
        const childPath = path ? `${path}.${k}` : k;
        this.buildTreeDOM(k, value[k], childPath, depth + 1, container);
      });
    } else {
      value.forEach((item: any, index: number) => {
        const childPath = `${path}[${index}]`;
        this.buildTreeDOM(index.toString(), item, childPath, depth + 1, container);
      });
    }
  }

  private buildLeafNode(
    key: string | null, value: any, path: string,
    indent: number, type: ValueType,
    keyMatches: boolean, valueMatches: boolean, parent: Node
  ) {
    const row = document.createElement('div');
    row.className = 'tree-node tree-leaf';
    row.dataset.path = path;
    row.style.paddingLeft = `${indent}px`;

    if (key !== null) {
      row.appendChild(this.createKey(key, keyMatches));
      row.appendChild(document.createTextNode(': '));
    }

    const valueEl = document.createElement('span');
    valueEl.className = valueMatches
      ? `tree-value tree-value-${type} search-highlight`
      : `tree-value tree-value-${type}`;
    valueEl.dataset.path = path;
    valueEl.dataset.type = type;

    if (type === 'string') {
      valueEl.textContent = `"${value}"`;
    } else if (type === 'null') {
      valueEl.textContent = 'null';
    } else {
      valueEl.textContent = String(value);
    }

    valueEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      this.enableEdit(path, valueEl, type);
    });

    row.appendChild(valueEl);
    row.appendChild(this.createCopyButton(path));
    parent.appendChild(row);
  }

  private createKey(key: string, highlighted: boolean): HTMLSpanElement {
    const span = document.createElement('span');
    span.className = highlighted ? 'tree-key search-highlight' : 'tree-key';
    span.textContent = `"${key}"`;
    return span;
  }

  private createCopyButton(path: string): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'tree-copy-path';
    btn.title = 'Copy path';
    btn.innerHTML = COPY_SVG;
    btn.addEventListener('click', (e) => { e.stopPropagation(); this.copyPath(path); });
    return btn;
  }

  toggleNode(path: string) {
    const wasExpanded = this.expandedPaths.has(path);
    if (wasExpanded) {
      this.expandedPaths.delete(path);
    } else {
      this.expandedPaths.add(path);
    }

    const wrapper = this.nodeMap.get(path);
    if (!wrapper) { this.render(this.data); return; }

    const row = wrapper.querySelector(':scope > .tree-node') as HTMLElement;
    const childrenContainer = wrapper.querySelector(':scope > .tree-children') as HTMLElement;
    if (!row || !childrenContainer) { this.render(this.data); return; }

    const toggle = row.querySelector('.tree-toggle') as HTMLElement;
    const preview = row.querySelector('.tree-preview') as HTMLElement;
    const inlineBrackets = row.querySelectorAll('.tree-bracket');
    const inlineClose = inlineBrackets.length > 1 ? inlineBrackets[1] as HTMLElement : null;
    const closeRow = childrenContainer.querySelector(':scope > .tree-node:last-child') as HTMLElement;

    if (wasExpanded) {
      // Collapse: hide children, show preview
      toggle?.classList.remove('expanded');
      if (toggle) toggle.textContent = '▶';
      if (preview) preview.style.display = '';
      if (inlineClose) inlineClose.style.display = '';
      childrenContainer.style.display = 'none';
      if (closeRow) closeRow.style.display = 'none';
    } else {
      // Expand: populate children if needed, show them
      toggle?.classList.add('expanded');
      if (toggle) toggle.textContent = '▼';
      if (preview) preview.style.display = 'none';
      if (inlineClose) inlineClose.style.display = 'none';

      const existingChildren = childrenContainer.querySelectorAll(':scope > .tree-group, :scope > .tree-leaf');
      if (existingChildren.length === 0) {
        const value = this.getValueByPath(this.data, path);
        const type = this.getValueType(value);
        const isObject = type === 'object';
        const keys = isObject ? Object.keys(value) : null;
        const depth = path.split(/[.\[\]]/).filter(Boolean).length;

        if (closeRow) closeRow.remove();
        this.populateChildren(childrenContainer, value, path, depth, isObject, keys);

        const newCloseRow = document.createElement('div');
        newCloseRow.className = 'tree-node';
        newCloseRow.style.paddingLeft = `${depth * 20}px`;
        const cb = document.createElement('span');
        cb.className = 'tree-bracket';
        cb.textContent = isObject ? '}' : ']';
        newCloseRow.appendChild(cb);
        childrenContainer.appendChild(newCloseRow);
      } else if (closeRow) {
        closeRow.style.display = '';
      }

      childrenContainer.style.display = '';
    }
  }

  expandAll() {
    this.expandedPaths.clear();
    this.collectAllPaths(this.data, '', this.expandedPaths);
    this.render(this.data);
  }

  collapseAll() {
    this.expandedPaths.clear();
    this.render(this.data);
  }

  collectAllPaths(obj: any, currentPath: string, pathSet: Set<string>) {
    if (obj && typeof obj === 'object') {
      pathSet.add(currentPath);
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const newPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
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

  search(term: string) {
    this.searchTerm = term.toLowerCase().trim();
    if (this.searchTerm) {
      this.expandedPaths.clear();
      this.expandMatchingPaths(this.data, '');
    }
    this.render(this.data);
  }

  expandMatchingPaths(obj: any, currentPath: string): boolean {
    if (!obj || typeof obj !== 'object') {
      return !!(this.searchTerm && String(obj).toLowerCase().includes(this.searchTerm));
    }

    let hasMatch = false;

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
        if (this.expandMatchingPaths(item, newPath)) {
          hasMatch = true;
          this.expandedPaths.add(currentPath);
        }
      });
    } else {
      Object.keys(obj).forEach((key) => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (key.toLowerCase().includes(this.searchTerm)) {
          hasMatch = true;
          this.expandedPaths.add(currentPath);
        }
        if (this.expandMatchingPaths(obj[key], newPath)) {
          hasMatch = true;
          this.expandedPaths.add(currentPath);
        }
      });
    }

    return hasMatch;
  }

  async copyPath(path: string) {
    try {
      await navigator.clipboard.writeText(path || 'root');
      this.callbacks.showSuccess?.(`Copied: ${path || 'root'}`);
    } catch (error) {
      console.error('Copy failed:', error);
      this.callbacks.showError?.('Copy failed');
    }
  }

  enableEdit(path: string, element: HTMLElement, type: string) {
    if (this.editingPath) return;

    this.editingPath = path;
    const currentValue = this.getValueByPath(this.data, path);

    element.setAttribute('contenteditable', 'true');
    element.classList.add('editing');
    element.textContent = currentValue;
    element.focus();

    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const saveEdit = () => {
      const newValue = element.textContent || '';
      this.saveEdit(path, newValue, type);
      element.removeAttribute('contenteditable');
      element.classList.remove('editing');
      this.editingPath = null;
    };

    const cancelEdit = () => {
      element.removeAttribute('contenteditable');
      element.classList.remove('editing');
      this.editingPath = null;
      this.render(this.data);
    };

    const keyHandler = (e: KeyboardEvent) => {
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

    const blurHandler = () => {
      saveEdit();
      element.removeEventListener('keydown', keyHandler);
      element.removeEventListener('blur', blurHandler);
    };

    element.addEventListener('keydown', keyHandler);
    element.addEventListener('blur', blurHandler);
  }

  saveEdit(path: string, newValue: string, type: string) {
    try {
      let parsedValue: any = newValue;

      if (type === 'number') {
        parsedValue = Number(newValue);
        if (isNaN(parsedValue)) throw new Error('Invalid number');
      } else if (type === 'boolean') {
        if (newValue.toLowerCase() === 'true') parsedValue = true;
        else if (newValue.toLowerCase() === 'false') parsedValue = false;
        else throw new Error('Boolean must be true or false');
      } else if (type === 'null') {
        if (newValue.toLowerCase() !== 'null') throw new Error('Cannot change null type');
        parsedValue = null;
      }

      this.setValueByPath(this.data, path, parsedValue);
      this.render(this.data);
      this.callbacks.onDataUpdate?.(this.data);
      this.callbacks.showSuccess?.('Value updated');
    } catch (error: any) {
      this.callbacks.showError?.(`Update failed: ${error.message}`);
      this.render(this.data);
    }
  }

  getValueByPath(obj: any, path: string): any {
    if (!path) return obj;
    const parts = this.parsePath(path);
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    return current;
  }

  setValueByPath(obj: any, path: string, value: any) {
    if (!path) return;
    const parts = this.parsePath(path);
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  parsePath(path: string): (string | number)[] {
    const parts: (string | number)[] = [];
    let current = '';
    let inBracket = false;

    for (let i = 0; i < path.length; i++) {
      const char = path[i];
      if (char === '[') {
        if (current) { parts.push(current); current = ''; }
        inBracket = true;
      } else if (char === ']') {
        if (inBracket && current) { parts.push(parseInt(current)); current = ''; }
        inBracket = false;
      } else if (char === '.' && !inBracket) {
        if (current) { parts.push(current); current = ''; }
      } else {
        current += char;
      }
    }
    if (current) {
      parts.push(inBracket ? parseInt(current) : current);
    }
    return parts;
  }

  getValueType(value: any): ValueType {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'unknown';
  }

  getData() {
    return this.data;
  }
}
