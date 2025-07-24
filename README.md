# JSON Formatter Tool

> **Language / 语言 / 言語:** [English](README.md) | [简体中文](README.zh-cn.md) | [繁體中文](README.zh-tw.md) | [日本語](README.ja.md)

A professional online JSON formatter with beautify, compress, validate and multi-format conversion capabilities. Smart handling of JavaScript objects, single quotes, trailing commas and other non-standard formats.

## Features

### Core Functions

- **JSON Formatting** - Format compressed JSON data into readable format with custom indentation
- **JSON Compression** - Compress JSON data by removing unnecessary spaces and line breaks
- **JSON Validation** - Validate JSON data syntax correctness with detailed error messages
- **Format Conversion** - Support conversion between JSON and other formats (YAML, XML, CSV)

### Smart Processing

- **Allow Unquoted Keys** - Supports JavaScript object literal format without requiring quotes for keys
- **Allow Single Quotes** - Automatically converts single-quoted strings to standard double-quote format with smart escape handling
- **Allow Trailing Commas** - Supports trailing commas and automatically cleans up unnecessary commas

## Use Cases

### Development & Debug

Direct copy-paste of JavaScript object code for quick formatting and validation.

### Config File Conversion

Convert JS config-like format to standard JSON format.

### Code Cleanup

Remove unnecessary trailing commas and standardize quote formats.

### Format Standardization

Unify mixed quote formats to standard JSON specification.

## Example

**Input (Supported Format):**

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

**Output (Standard JSON):**

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

## Technical Features

- **Smart Processing Order** - Trailing commas → Single quotes → Unquoted keys
- **Safe Parsing** - Avoids processing special characters within string content
- **Full Integration** - Supports all function modules (format, compress, validate, convert)
- **Real-time Response** - Automatically reprocesses when any option changes
- **Comprehensive Error Messages** - Includes usage instructions for all features
- **Backward Compatible** - Does not affect existing standard JSON processing

## Multi-language Support

The tool supports multiple languages:

- English (en)
- 简体中文 (zh-cn)
- 繁體中文 (zh-tw)
- 日本語 (ja)

## Getting Started

1. Paste or enter your JSON data in the input area
2. Select processing options as needed:
   - Allow unquoted keys
   - Allow single quotes
   - Allow trailing commas
3. Choose your desired action:
   - **Format** - Beautify JSON with proper indentation
   - **Compress** - Minify JSON by removing whitespace
   - **Validate** - Check JSON syntax validity
   - **Convert** - Transform to other formats (YAML, XML, CSV)
4. Copy the result or download as file

## User Interface

- **Theme Toggle** - Switch between light and dark themes
- **Language Selection** - Choose your preferred language
- **Import/Export** - Load from file or save results
- **One-click Copy** - Copy formatted results to clipboard
- **Real-time Validation** - Instant feedback on JSON validity

## Built With

- Modern web technologies for optimal performance
- Responsive design for all devices
- Accessibility-compliant interface
- Progressive web app capabilities

---

**Boost your development efficiency with our comprehensive JSON processing tool!**
