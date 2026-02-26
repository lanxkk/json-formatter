# JSON 格式化工具：把“乱糟糟”的数据变成清清楚楚

你一定也遇到过这种场景：API 一口气给你吐回一整行 JSON，看着就头大；或者随手拷了一段 JS 对象，单引号、尾逗号、没引号的键名通通不符合 JSON 标准，贴到普通格式化器直接报错。为了解决这些真实世界里的“小麻烦”，我做了这个在线 JSON 工具，帮你一键搞定。

- 它能做什么
  - 格式化：把挤在一行的 JSON 美化成可读结构（可自定义缩进）
  - 压缩：去掉空格和换行，生成最小体积的 JSON
  - 验证：检查语法错误并给出清晰的错误提示
  - 去转义：把那些看着别扭的转义字符还原回正常文本
  - 转换：一键把 JSON 转成 YAML、XML、CSV

- 真正有用的小心机
  - 允许不带引号的键名：直接粘贴 JavaScript 对象也能处理
  - 允许单引号：'hello' 会自动转成标准的 "hello"
  - 允许尾随逗号：最后一个元素后的逗号也能智能清理

- 举个例子
  你丢进来这样的内容：
  ```javascript
  {
    name: 'John Doe',
    age: 30,
    'email': "john@example.com",
    hobbies: ['reading', "coding", 'gaming',],
    address: {
      street: '123 Main St',
      city: 'New York',
    },
  }
  ```
  它会帮你变成标准 JSON：
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "hobbies": ["reading", "coding", "gaming"],
    "address": {
      "street": "123 Main St",
      "city": "New York"
    }
  }
  ```

- 贴心的小细节
  - 导入/导出：文件直接读写，结果也能一键下载
  - 一键复制：结果复制到剪贴板省时省力
  - 深色模式：夜间看着更舒服
  - 多语言界面：中/英/繁/日任你选
  - 实时提示：输入或切换选项就自动处理，哪里错直接告诉你

- 怎么用
  - 把 JSON 或 JS 对象粘贴到输入框
  - 需要的话勾选选项：允许不带引号的键名、允许单引号、允许尾随逗号
  - 选择功能页签：格式化 / 压缩 / 去转义 / 验证 / 转换
  - 如果是转换，选择 YAML / XML / CSV
  - 复制结果，或直接导出成文件

- 隐私与性能
  - 所有处理都在你的浏览器本地完成，不会上传任何数据
  - 现代前端技术构建，轻量、快速、好用

- 在线体验
  - 英文版：https://jsonformatter.lanxk.com/
  - 简体中文：https://jsonformatter.lanxk.com/zh-cn/
  - 繁體中文：https://jsonformatter.lanxk.com/zh-tw/
  - 日本語：https://jsonformatter.lanxk.com/ja/

如果你经常要调 API、清理配置、做格式转换，强烈建议把它收进工具箱。欢迎试用，也欢迎给我提想法：你最头疼的 JSON 场景是什么？这个工具有没有帮上忙？

