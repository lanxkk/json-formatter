import type { Language } from './index';

export const translations = {
  'zh-cn': {
    // 页面标题和描述
    'page.title': 'JSON 格式化工具 - 在线JSON格式化、压缩、验证、转换',
    'page.description': '专业的在线JSON格式化工具，支持JSON美化、压缩、验证和多格式转换，智能处理JavaScript对象、单引号、尾随逗号等非标准格式。',
    'site.title': 'JSON 格式化工具',
    
    // 头部导航
    'nav.theme.toggle': '切换主题',
    'nav.github': 'GitHub',
    'nav.language': '语言',
    
    // JSON格式化器
    'formatter.title': 'JSON 格式化工具',
    'formatter.input.placeholder': '在此粘贴或输入JSON数据...',
    'formatter.output.placeholder': '格式化后的JSON将显示在这里...',
    'formatter.button.format': '格式化',
    'formatter.button.compress': '压缩',
    'formatter.button.validate': '验证',
    'formatter.button.clear': '清空',
    'formatter.button.copy': '复制',
    'formatter.button.download': '下载',
    'formatter.status.valid': 'JSON 有效',
    'formatter.status.invalid': 'JSON 无效',
    'formatter.status.copied': '已复制到剪贴板',
    'formatter.error.parse': 'JSON 解析错误',
    
    // 功能文档
    'features.title': '功能特性',
    'features.format.title': 'JSON 格式化',
    'features.format.description': '将压缩的JSON数据格式化为易读的格式，支持自定义缩进',
    'features.compress.title': 'JSON 压缩',
    'features.compress.description': '压缩JSON数据，移除不必要的空格和换行符',
    'features.validate.title': 'JSON 验证',
    'features.validate.description': '验证JSON数据的语法正确性，显示详细的错误信息',
    'features.convert.title': '格式转换',
    'features.convert.description': '支持JSON与其他格式的相互转换',
    
    // 广告横幅
    'ad.banner.title': '提升开发效率',
    'ad.banner.description': '使用我们的JSON工具，让开发更简单',
    
    // 其他UI文本
    'ui.input': '输入',
    'ui.output': '输出',
    'ui.options': '选项',
    'ui.import': '导入文件',
    'ui.export': '导出文件',
    'ui.unescape': '去转义',
    'ui.convert': '转换',
    'ui.convert.options': '转换选项',
    'ui.convert.yaml': '转为 YAML',
    'ui.convert.xml': '转为 XML',
    'ui.convert.csv': '转为 CSV',
    'ui.option.unquoted': '允许不带引号的键名',
    'ui.option.single.quotes': '允许使用单引号',
    'ui.option.trailing.commas': '允许尾随逗号（最后一项后面有逗号）',
    
    // 功能文档
    'features.main.title': '强大的JSON处理功能',
    'features.main.description': '支持多种非标准格式，让JSON处理变得更加灵活和便捷',
    'features.unquoted.title': '允许不带引号的键名',
    'features.unquoted.description': '支持类似 JavaScript 对象字面量的格式，无需为键名添加引号。',
    'features.quotes.title': '允许使用单引号',
    'features.quotes.description': '自动将单引号字符串转换为标准的双引号格式，智能处理转义字符。',
    'features.trailing.title': '允许尾随逗号（最后一项后面有逗号）',
    'features.trailing.description': '支持尾随逗号（trailing comma），自动清理多余的逗号。',
    'features.example.title': '全功能组合示例',
    'features.example.input': '输入（支持的格式）',
    'features.example.output': '输出（标准JSON）',
    'features.usage.title': '使用场景',
    'features.usage.debug': '开发调试',
    'features.usage.debug.desc': '直接复制粘贴JavaScript对象代码',
    'features.usage.config': '配置文件转换',
    'features.usage.config.desc': '将类似JS config的格式转为JSON',
    'features.usage.clean': '代码清理',
    'features.usage.clean.desc': '移除多余的尾随逗号',
    'features.usage.format': '格式统一',
    'features.usage.format.desc': '将混合引号格式统一为标准JSON',
    'features.tech.title': '技术特点',
    'features.tech.order': '智能处理顺序',
    'features.tech.order.desc': '尾随逗号 → 单引号 → 不带引号的键名',
    'features.tech.safe': '安全解析',
    'features.tech.safe.desc': '避免处理字符串内容中的特殊字符',
    'features.tech.integration': '全面集成',
    'features.tech.integration.desc': '支持所有功能模块（格式化、压缩、验证、转换）',
    'features.tech.realtime': '实时响应',
    'features.tech.realtime.desc': '任何复选框状态改变都会自动重新处理',
    'features.tech.error': '完善错误提示',
    'features.tech.error.desc': '包含所有新功能的使用说明',
    'features.tech.compatible': '向后兼容',
    'features.tech.compatible.desc': '不影响现有的标准JSON处理',
    'ui.input.label': '输入:',
    'ui.output.label': '输出:',
  },
  
  'en': {
    // Page title and description
    'page.title': 'JSON Formatter - Online JSON Format, Compress, Validate, Convert',
    'page.description': 'Online JSON formatter with beautify, compress, validate and multi-format conversion. Smart handling of JavaScript objects, single quotes, trailing commas.',
    'site.title': 'JSON Formatter',
    
    // Header navigation
    'nav.theme.toggle': 'Toggle Theme',
    'nav.github': 'GitHub',
    'nav.language': 'Language',
    
    // JSON formatter
    'formatter.title': 'JSON Formatter',
    'formatter.input.placeholder': 'Paste or enter JSON data here...',
    'formatter.output.placeholder': 'Formatted JSON will be displayed here...',
    'formatter.button.format': 'Format',
    'formatter.button.compress': 'Compress',
    'formatter.button.validate': 'Validate',
    'formatter.button.clear': 'Clear',
    'formatter.button.copy': 'Copy',
    'formatter.button.download': 'Download',
    'formatter.status.valid': 'JSON Valid',
    'formatter.status.invalid': 'JSON Invalid',
    'formatter.status.copied': 'Copied to clipboard',
    'formatter.error.parse': 'JSON Parse Error',
    
    // Features documentation
    'features.title': 'Features',
    'features.format.title': 'JSON Formatting',
    'features.format.description': 'Format compressed JSON data into readable format with custom indentation',
    'features.compress.title': 'JSON Compression',
    'features.compress.description': 'Compress JSON data by removing unnecessary spaces and line breaks',
    'features.validate.title': 'JSON Validation',
    'features.validate.description': 'Validate JSON data syntax correctness with detailed error messages',
    'features.convert.title': 'Format Conversion',
    'features.convert.description': 'Support conversion between JSON and other formats',
    
    // Ad banner
    'ad.banner.title': 'Boost Development Efficiency',
    'ad.banner.description': 'Use our JSON tools to make development easier',
    
    // Other UI text
    'ui.input': 'Input',
    'ui.output': 'Output',
    'ui.options': 'Options',
    'ui.import': 'Import File',
    'ui.export': 'Export File',
    'ui.unescape': 'Unescape',
    'ui.convert': 'Convert',
    'ui.convert.options': 'Convert Options',
    'ui.convert.yaml': 'Convert to YAML',
    'ui.convert.xml': 'Convert to XML',
    'ui.convert.csv': 'Convert to CSV',
    'ui.option.unquoted': 'Allow unquoted keys',
    'ui.option.single.quotes': 'Allow single quotes',
    'ui.option.trailing.commas': 'Allow trailing commas',
    
    // Features documentation
    'features.main.title': 'Powerful JSON Processing',
    'features.main.description': 'Supports various non-standard formats, making JSON processing more flexible and convenient',
    'features.unquoted.title': 'Allow Unquoted Keys',
    'features.unquoted.description': 'Supports JavaScript object literal format without requiring quotes for keys.',
    'features.quotes.title': 'Allow Single Quotes',
    'features.quotes.description': 'Automatically converts single-quoted strings to standard double-quote format with smart escape handling.',
    'features.trailing.title': 'Allow Trailing Commas',
    'features.trailing.description': 'Supports trailing commas and automatically cleans up unnecessary commas.',
    'features.example.title': 'Full Feature Example',
    'features.example.input': 'Input (Supported Format)',
    'features.example.output': 'Output (Standard JSON)',
    'features.usage.title': 'Use Cases',
    'features.usage.debug': 'Development & Debug',
    'features.usage.debug.desc': 'Direct copy-paste of JavaScript object code',
    'features.usage.config': 'Config File Conversion',
    'features.usage.config.desc': 'Convert JS config-like format to JSON',
    'features.usage.clean': 'Code Cleanup',
    'features.usage.clean.desc': 'Remove unnecessary trailing commas',
    'features.usage.format': 'Format Standardization',
    'features.usage.format.desc': 'Unify mixed quote formats to standard JSON',
    'features.tech.title': 'Technical Features',
    'features.tech.order': 'Smart Processing Order',
    'features.tech.order.desc': 'Trailing commas → Single quotes → Unquoted keys',
    'features.tech.safe': 'Safe Parsing',
    'features.tech.safe.desc': 'Avoids processing special characters within string content',
    'features.tech.integration': 'Full Integration',
    'features.tech.integration.desc': 'Supports all function modules (format, compress, validate, convert)',
    'features.tech.realtime': 'Real-time Response',
    'features.tech.realtime.desc': 'Automatically reprocesses when any checkbox state changes',
    'features.tech.error': 'Comprehensive Error Messages',
    'features.tech.error.desc': 'Includes usage instructions for all new features',
    'features.tech.compatible': 'Backward Compatible',
    'features.tech.compatible.desc': 'Does not affect existing standard JSON processing',
    'ui.input.label': 'Input:',
    'ui.output.label': 'Output:',
  },
  
  'ja': {
    // ページタイトルと説明
    'page.title': 'JSONフォーマッター - オンラインJSON整形、圧縮、検証、変換',
    'page.description': 'プロフェッショナルなオンラインJSON整形ツール。美化、圧縮、検証、多形式変換をサポート。JavaScriptオブジェクト、シングルクォート、末尾カンマの智能処理とリアルタイムエラー検出機能付き。',
    'site.title': 'JSONフォーマッター',
    
    // ヘッダーナビゲーション
    'nav.theme.toggle': 'テーマ切り替え',
    'nav.github': 'GitHub',
    'nav.language': '言語',
    
    // JSONフォーマッター
    'formatter.title': 'JSONフォーマッター',
    'formatter.input.placeholder': 'JSONデータをここに貼り付けまたは入力してください...',
    'formatter.output.placeholder': '整形されたJSONがここに表示されます...',
    'formatter.button.format': '整形',
    'formatter.button.compress': '圧縮',
    'formatter.button.validate': '検証',
    'formatter.button.clear': 'クリア',
    'formatter.button.copy': 'コピー',
    'formatter.button.download': 'ダウンロード',
    'formatter.status.valid': 'JSON有効',
    'formatter.status.invalid': 'JSON無効',
    'formatter.status.copied': 'クリップボードにコピーしました',
    'formatter.error.parse': 'JSON解析エラー',
    
    // 機能ドキュメント
    'features.title': '機能',
    'features.format.title': 'JSON整形',
    'features.format.description': '圧縮されたJSONデータを読みやすい形式に整形、カスタムインデントをサポート',
    'features.compress.title': 'JSON圧縮',
    'features.compress.description': '不要なスペースと改行を削除してJSONデータを圧縮',
    'features.validate.title': 'JSON検証',
    'features.validate.description': 'JSONデータの構文正確性を検証、詳細なエラーメッセージを表示',
    'features.convert.title': 'フォーマット変換',
    'features.convert.description': 'JSONと他のフォーマット間の相互変換をサポート',
    
    // 広告バナー
    'ad.banner.title': '開発効率の向上',
    'ad.banner.description': '私たちのJSONツールを使用して、開発をより簡単にします',
    
    // その他のUIテキスト
    'ui.input': '入力',
    'ui.output': '出力',
    'ui.options': 'オプション',
    'ui.import': 'ファイルインポート',
    'ui.export': 'ファイルエクスポート',
    'ui.unescape': 'エスケープ解除',
    'ui.convert': '変換',
    'ui.convert.options': '変換オプション',
    'ui.convert.yaml': 'YAMLに変換',
    'ui.convert.xml': 'XMLに変換',
    'ui.convert.csv': 'CSVに変換',
    'ui.option.unquoted': 'クォートなしキーを許可',
    'ui.option.single.quotes': 'シングルクォートを許可',
    'ui.option.trailing.commas': '末尾カンマを許可',
    
    // 機能ドキュメント
    'features.main.title': '強力なJSON処理機能',
    'features.main.description': '様々な非標準フォーマットをサポートし、JSON処理をより柔軟で便利にします',
    'features.unquoted.title': 'クォートなしキーを許可',
    'features.unquoted.description': 'JavaScriptオブジェクトリテラル形式をサポートし、キーに引用符を必要としません。',
    'features.quotes.title': 'シングルクォートを許可',
    'features.quotes.description': 'シングルクォート文字列を標準のダブルクォート形式に自動変換し、エスケープ文字を適切に処理します。',
    'features.trailing.title': '末尾カンマを許可',
    'features.trailing.description': '末尾カンマ（trailing comma）をサポートし、不要なカンマを自動的にクリーンアップします。',
    'features.example.title': '全機能組み合わせ例',
    'features.example.input': '入力（サポートされる形式）',
    'features.example.output': '出力（標準JSON）',
    'features.usage.title': '使用場面',
    'features.usage.debug': '開発・デバッグ',
    'features.usage.debug.desc': 'JavaScriptオブジェクトコードの直接コピー&ペースト',
    'features.usage.config': '設定ファイル変換',
    'features.usage.config.desc': 'JS設定のような形式をJSONに変換',
    'features.usage.clean': 'コードクリーンアップ',
    'features.usage.clean.desc': '不要な末尾カンマを削除',
    'features.usage.format': 'フォーマット統一',
    'features.usage.format.desc': '混在する引用符形式を標準JSONに統一',
    'features.tech.title': '技術的特徴',
    'features.tech.order': 'スマート処理順序',
    'features.tech.order.desc': '末尾カンマ → シングルクォート → クォートなしキー',
    'features.tech.safe': '安全な解析',
    'features.tech.safe.desc': '文字列内容の特殊文字の処理を回避',
    'features.tech.integration': '完全統合',
    'features.tech.integration.desc': 'すべての機能モジュール（整形、圧縮、検証、変換）をサポート',
    'features.tech.realtime': 'リアルタイム応答',
    'features.tech.realtime.desc': 'チェックボックスの状態変更時に自動的に再処理',
    'features.tech.error': '包括的エラーメッセージ',
    'features.tech.error.desc': 'すべての新機能の使用説明を含む',
    'features.tech.compatible': '後方互換性',
    'features.tech.compatible.desc': '既存の標準JSON処理に影響しない',
    'ui.input.label': '入力:',
    'ui.output.label': '出力:',
  },
  
  'zh-tw': {
    // 頁面標題和描述
    'page.title': 'JSON 格式化工具 - 線上JSON格式化、壓縮、驗證、轉換',
    'page.description': '專業的線上JSON格式化工具，支援JSON美化、壓縮、驗證和多格式轉換。智慧處理JavaScript物件、單引號、尾隨逗號等非標準格式，提供即時錯誤檢測和一鍵複製功能。',
    'site.title': 'JSON 格式化工具',
    
    // 頭部導航
    'nav.theme.toggle': '切換主題',
    'nav.github': 'GitHub',
    'nav.language': '語言',
    
    // JSON格式化器
    'formatter.title': 'JSON 格式化工具',
    'formatter.input.placeholder': '在此貼上或輸入JSON資料...',
    'formatter.output.placeholder': '格式化後的JSON將顯示在這裡...',
    'formatter.button.format': '格式化',
    'formatter.button.compress': '壓縮',
    'formatter.button.validate': '驗證',
    'formatter.button.clear': '清空',
    'formatter.button.copy': '複製',
    'formatter.button.download': '下載',
    'formatter.status.valid': 'JSON 有效',
    'formatter.status.invalid': 'JSON 無效',
    'formatter.status.copied': '已複製到剪貼簿',
    'formatter.error.parse': 'JSON 解析錯誤',
    
    // 功能文件
    'features.title': '功能特色',
    'features.format.title': 'JSON 格式化',
    'features.format.description': '將壓縮的JSON資料格式化為易讀的格式，支援自訂縮排',
    'features.compress.title': 'JSON 壓縮',
    'features.compress.description': '壓縮JSON資料，移除不必要的空格和換行符',
    'features.validate.title': 'JSON 驗證',
    'features.validate.description': '驗證JSON資料的語法正確性，顯示詳細的錯誤資訊',
    'features.convert.title': '格式轉換',
    'features.convert.description': '支援JSON與其他格式的相互轉換',
    
    // 廣告橫幅
    'ad.banner.title': '提升開發效率',
    'ad.banner.description': '使用我們的JSON工具，讓開發更簡單',
    
    // 其他UI文字
    'ui.input': '輸入',
    'ui.output': '輸出',
    'ui.options': '選項',
    'ui.import': '匯入檔案',
    'ui.export': '匯出檔案',
    'ui.unescape': '去轉義',
    'ui.convert': '轉換',
    'ui.convert.options': '轉換選項',
    'ui.convert.yaml': '轉為 YAML',
    'ui.convert.xml': '轉為 XML',
    'ui.convert.csv': '轉為 CSV',
    'ui.option.unquoted': '允許不帶引號的鍵名',
    'ui.option.single.quotes': '允許使用單引號',
    'ui.option.trailing.commas': '允許尾隨逗號',
    
    // 功能文件
    'features.main.title': '強大的JSON處理功能',
    'features.main.description': '支援多種非標準格式，讓JSON處理變得更加靈活和便捷',
    'features.unquoted.title': '允許不帶引號的鍵名',
    'features.unquoted.description': '支援類似 JavaScript 物件字面量的格式，無需為鍵名添加引號。',
    'features.quotes.title': '允許使用單引號',
    'features.quotes.description': '自動將單引號字串轉換為標準的雙引號格式，智慧處理轉義字元。',
    'features.trailing.title': '允許尾隨逗號',
    'features.trailing.description': '支援尾隨逗號（trailing comma），自動清理多餘的逗號。',
    'features.example.title': '全功能組合示例',
    'features.example.input': '輸入（支援的格式）',
    'features.example.output': '輸出（標準JSON）',
    'features.usage.title': '使用場景',
    'features.usage.debug': '開發調試',
    'features.usage.debug.desc': '直接複製貼上JavaScript物件程式碼',
    'features.usage.config': '配置檔案轉換',
    'features.usage.config.desc': '將類似JS config的格式轉為JSON',
    'features.usage.clean': '程式碼清理',
    'features.usage.clean.desc': '移除多餘的尾隨逗號',
    'features.usage.format': '格式統一',
    'features.usage.format.desc': '將混合引號格式統一為標準JSON',
    'features.tech.title': '技術特點',
    'features.tech.order': '智慧處理順序',
    'features.tech.order.desc': '尾隨逗號 → 單引號 → 不帶引號的鍵名',
    'features.tech.safe': '安全解析',
    'features.tech.safe.desc': '避免處理字串內容中的特殊字元',
    'features.tech.integration': '全面整合',
    'features.tech.integration.desc': '支援所有功能模組（格式化、壓縮、驗證、轉換）',
    'features.tech.realtime': '即時響應',
    'features.tech.realtime.desc': '任何複選框狀態改變都會自動重新處理',
    'features.tech.error': '完善錯誤提示',
    'features.tech.error.desc': '包含所有新功能的使用說明',
    'features.tech.compatible': '向後相容',
    'features.tech.compatible.desc': '不影響現有的標準JSON處理',
    'ui.input.label': '輸入:',
    'ui.output.label': '輸出:',
  }
} as const;

export function getTranslation(lang: Language, key: string): string {
  return translations[lang][key as keyof typeof translations[Language]] || key;
}

export function t(lang: Language) {
  return (key: string) => getTranslation(lang, key);
} 