/**
 * PostCSS 插件：转换微信小程序不支持的 TailwindCSS 语法
 * 处理以下情况：
 * 1. 分数语法 (h-1/2 -> h-50)
 * 2. 方括号语法 (h-[50] -> h-50)
 * 3. 伪类语法 (hover:xxx -> hover__xxx)
 * 4. 通配符选择器 (* -> view/text)
 * 5. 方括号内的百分比语法 (w-[80%] -> w-80percent)
 * 6. 十六进制颜色 (bg-#ffffff -> bg-ffffff)
 * 7. 方括号内的十六进制颜色 (bg-[#ff6b6b] -> bg-ff6b6b)
 */

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-tailwind-wxapp',
    
    // 处理整个 CSS 文件
    Once(root) {
      // 处理所有规则
      root.walkRules(rule => {
        // 获取原始选择器
        const originalSelector = rule.selector;
        
        // 处理选择器中的伪类
        if (originalSelector && originalSelector.includes(':hover')) {
          // 将 hover: 转换为 hover__
          const newSelector = originalSelector.replace(/:hover/g, '__hover');
          rule.selector = newSelector;
        }
        
        // 处理通配符选择器 *
        if (originalSelector && originalSelector.includes('*')) {
          // 将 * 选择器替换为 view, text 等微信小程序支持的元素
          const newSelector = originalSelector.replace(/\*/g, 'view');
          rule.selector = newSelector;
          
          // 复制一份规则给 text 元素
          if (originalSelector === '*' || originalSelector === '*, ::before, ::after') {
            const textRule = rule.clone();
            textRule.selector = originalSelector.replace(/\*/g, 'text');
            rule.parent.insertAfter(rule, textRule);
          }
        }
      });
      
      // 修改 CSS 类名
      root.walkRules(rule => {
        if (rule.selector) {
          // 处理方括号内的十六进制颜色 (bg-[#ff6b6b] -> bg-ff6b6b)
          rule.selector = rule.selector.replace(/(\\\[)?\\#([0-9a-fA-F]{3,6})(\\\])?/g, '$2');

          // 处理方括号内的百分比语法 (w-[80%] -> w-80percent)
          rule.selector = rule.selector.replace(/\.([a-z]+-)\\?\[([^\\%\]]*?)\\?%\\?\s*\\?\]/g, (match, prefix, value) => {
            const cleanValue = value.trim();
            return `.${prefix}${cleanValue}percent`;
          });
          
          // 处理其他方括号语法 (h-[50px] -> h-50px)
          rule.selector = rule.selector.replace(/\.([a-z]+-)\\?\[([^\\%\]#][^\]]*?)\\?\]/g, '.$1$2');
          
          // 移除类名末尾可能存在的反斜杠
          rule.selector = rule.selector.replace(/\\$/g, '');
          
          // 处理 .h-1\/2 形式的选择器
          rule.selector = rule.selector.replace(/\.([a-z]+-)(\d+)\\?\/(\d+)/g, (match, prefix, numerator, denominator) => {
            const percentage = Math.round((parseInt(numerator) / parseInt(denominator)) * 100);
            return `.${prefix}${percentage}`;
          });
          
          // 处理伪类语法 (hover:bg-red-500 -> hover__bg-red-500)
          rule.selector = rule.selector.replace(/\.([a-z]+)\\?:([a-z]+(?:-[a-z\-]+)?(?:-[\d]+)?)/g, (match, pseudo, className) => {
            return `.${pseudo}__${className}`;
          });
        }
      });
      
      // 修改属性值
      root.walkDecls(decl => {
        // 处理百分比值
        if (decl.value && decl.value.includes('%')) {
          // 保留百分比值，因为这些在属性值中是合法的
          // 这里不做修改
        }
        
        // 处理十六进制颜色值
        if (decl.value && decl.value.includes('#')) {
          // 保留十六进制颜色值，因为这些在属性值中是合法的
          // 这里不做修改
        }
        
        // 将 px 转换为 rpx
        if (decl.value && decl.value.includes('px')) {
          // 使用正则表达式匹配所有的 px 值
          decl.value = decl.value.replace(/([\d.]+)px/g, (match, value) => {
            // 将数值乘以 2 转换为 rpx
            // 微信小程序中 1px = 2rpx
            const rpxValue = parseFloat(value) * 2;
            return `${rpxValue}rpx`;
          });
        }
      });
    }
  };
};

module.exports.postcss = true;
