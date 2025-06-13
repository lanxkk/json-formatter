// Stagewise Toolbar 初始化脚本
// 只在开发模式下运行

// 动态导入 toolbar 模块
async function initStagewiseToolbar() {
  try {
    // 检查是否为开发环境
    if (import.meta.env.MODE === 'development') {
      const { initToolbar } = await import('@stagewise/toolbar');
      
      // 定义 toolbar 配置
      const stagewiseConfig = {
        plugins: [],
      };
      
      // 初始化 toolbar
      initToolbar(stagewiseConfig);
      console.log('Stagewise Toolbar 已初始化');
    }
  } catch (error) {
    console.warn('初始化 Stagewise Toolbar 时出错:', error);
  }
}

// 在页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStagewiseToolbar);
} else {
  initStagewiseToolbar();
} 