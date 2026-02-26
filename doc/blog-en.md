# JSON Formatter: Make Messy JSON Instantly Readable

We’ve all stared at a wall of minified JSON, squinting to find that one missing comma. Or pasted a JavaScript object with single quotes and unquoted keys—only to watch basic formatters throw errors. I built this tool to handle the messy, real-world JSON we actually work with.

- What it does
  - Format: Prettify compact JSON with custom indentation
  - Compress: Minify by removing whitespace
  - Validate: Catch syntax issues with clear error messages
  - Unescape: Clean up pesky escape sequences
  - Convert: Turn JSON into YAML, XML, or CSV

- Built for real-world input
  - Unquoted keys: Paste JavaScript object literals directly
  - Single quotes: 'hello' automatically becomes "hello"
  - Trailing commas: Extra commas after the last item? Cleaned up

- Quick example
  Paste this:
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
  Get clean, standard JSON:
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

- Nice touches
  - Import/Export files, or download results directly
  - One‑click copy to clipboard
  - Dark mode for comfy late‑night debugging
  - Multi‑language UI: English / Simplified Chinese / Traditional Chinese / Japanese
  - Real‑time feedback: auto‑processes on input and option changes

- How to use it
  - Paste JSON (or a JS object) into the input
  - Toggle options if needed: allow unquoted keys, single quotes, trailing commas
  - Pick a tab: Format / Compress / Unescape / Validate / Convert
  - For Convert, choose YAML / XML / CSV
  - Copy the result or export it as a file

- Privacy & performance
  - Everything runs locally in your browser—no uploads, no data leaves your machine
  - Built with modern web tech for speed and reliability

- Try it
  - English: https://jsonformatter.lanxk.com/
  - Simplified Chinese: https://jsonformatter.lanxk.com/zh-cn/
  - Traditional Chinese: https://jsonformatter.lanxk.com/zh-tw/
  - Japanese: https://jsonformatter.lanxk.com/ja/

If you debug APIs, clean up configs, or convert formats regularly, this tool will save you time. Give it a spin—and tell me your biggest JSON headache and whether this helps!

