/**
 * Vite 插件：转换微信小程序不支持的 TailwindCSS 语法
 * 处理 Vue、JS、CSS 文件中的 TailwindCSS 类名
 * 处理以下情况：
 * 1. 分数语法 (h-1/2 -> h-50)
 * 2. 方括号语法 (h-[50px] -> h-50px)
 * 3. 方括号内的百分比语法 (w-[80%] -> w-80percent)
 * 4. 伪类语法 (hover:xxx -> hover__xxx)
 * 5. 十六进制颜色 (bg-#ffffff -> bg-ffffff)
 * 6. 伪类中的方括号十六进制颜色 (hover:bg-[#ee5253] -> hover__bg-ee5253)
 */

// 处理分数语法的正则表达式
const fractionRegex = /class="([^"]*)([a-z]+-)([\d]+)\/(\d+)([^"]*)"/g;
// 处理方括号内的百分比语法的正则表达式
const bracketPercentRegex = /class="([^"]*)([a-z]+-)\[([^%\]]*?)%\s*\]([^"]*)"/g;
// 处理其他方括号语法的正则表达式
const bracketRegex = /class="([^"]*)([a-z]+-)\[([^\]%#]+)\]([^"]*)"/g;
// 处理伪类语法的正则表达式
const hoverRegex = /class="([^"]*)(hover:)([^"\[]+)([^"]*)"/g;
// 处理十六进制颜色的正则表达式
const hexColorRegex = /class="([^"]*)([a-z]+-)#([0-9a-fA-F]+)([^"]*)"/g;
// 处理方括号内的十六进制颜色的正则表达式
const bracketHexColorRegex = /class="([^"]*)([a-z]+-)\[#([0-9a-fA-F]+)\]([^"]*)"/g;
// 处理伪类中的方括号十六进制颜色的正则表达式
const hoverBracketHexColorRegex = /class="([^"]*)(hover:)([a-z]+-)\[#([0-9a-fA-F]+)\]([^"]*)"/g;

/**
 * 转换分数语法
 * 例如：h-1/2 -> h-50
 */
function transformFraction(match, prefix, property, numerator, denominator, suffix) {
  const percentage = Math.round((parseInt(numerator) / parseInt(denominator)) * 100);
  return `class="${prefix}${property}${percentage}${suffix}"`;
}

/**
 * 转换方括号内的百分比语法
 * 例如：w-[80%] -> w-80percent
 */
function transformBracketPercent(match, prefix, property, value, suffix) {
  // 去除值中可能的空格
  const cleanValue = value.trim();
  return `class="${prefix}${property}${cleanValue}percent${suffix}"`;
}

/**
 * 转换其他方括号语法
 * 例如：h-[50px] -> h-50px
 */
function transformBracket(match, prefix, property, value, suffix) {
  return `class="${prefix}${property}${value}${suffix}"`;
}

/**
 * 转换伪类语法
 * 例如：hover:bg-red-500 -> hover__bg-red-500
 */
function transformHover(match, prefix, hover, className, suffix) {
  // 将 hover: 转换为 hover__
  return `class="${prefix}hover__${className}${suffix}"`;
}

/**
 * 转换十六进制颜色
 * 例如：bg-#ffffff -> bg-ffffff
 */
function transformHexColor(match, prefix, property, color, suffix) {
  return `class="${prefix}${property}${color}${suffix}"`;
}

/**
 * 转换方括号内的十六进制颜色
 * 例如：bg-[#ffffff] -> bg-ffffff
 */
function transformBracketHexColor(match, prefix, property, color, suffix) {
  return `class="${prefix}${property}${color}${suffix}"`;
}

/**
 * 转换伪类中的方括号十六进制颜色
 * 例如：hover:bg-[#ee5253] -> hover__bg-ee5253
 */
function transformHoverBracketHexColor(match, prefix, hover, property, color, suffix) {
  return `class="${prefix}hover__${property}${color}${suffix}"`;
}

/**
 * 转换 JS 中的类名字符串
 * 例如：'h-1/2 w-full' -> 'h-50 w-full'
 */
function transformJsClassString(code) {
  // 查找可能包含类名的字符串
  return code.replace(/(['"`])(.*?)(\1)/g, (match, quote, content, endQuote) => {
    // 检查内容是否可能是类名列表
    if (content.match(/[a-z]+-[\d\/\[\]%#]+/)) {
      // 处理伪类中的方括号十六进制颜色
      let newContent = content.replace(/(hover:)([a-z]+-)\[#([0-9a-fA-F]+)\]/g, (match, hover, property, color) => {
        return `hover__${property}${color}`;
      });
      
      // 处理方括号内的十六进制颜色
      newContent = newContent.replace(/([a-z]+-)\[#([0-9a-fA-F]+)\]/g, (match, property, color) => {
        return `${property}${color}`;
      });
      
      // 处理分数语法
      newContent = newContent.replace(/([a-z]+-)(\d+)\/(\d+)/g, (match, property, numerator, denominator) => {
        const percentage = Math.round((parseInt(numerator) / parseInt(denominator)) * 100);
        return `${property}${percentage}`;
      });
      
      // 处理方括号内的百分比语法
      newContent = newContent.replace(/([a-z]+-)(\[)([^%\]]*?)(%\s*\])/g, (match, property, openBracket, value, percentCloseBracket) => {
        const cleanValue = value.trim();
        return `${property}${cleanValue}percent`;
      });
      
      // 处理其他方括号语法
      newContent = newContent.replace(/([a-z]+-)(\[)([^\]%#]+)(\])/g, (match, property, openBracket, value, closeBracket) => {
        return `${property}${value}`;
      });
      
      // 处理伪类语法
      newContent = newContent.replace(/(hover:)([a-z]+-[a-z\-]+(?:-[\d]+)?)/g, 'hover__$2');
      
      // 处理十六进制颜色
      newContent = newContent.replace(/([a-z]+-)#([0-9a-fA-F]+)/g, (match, property, color) => {
        return `${property}${color}`;
      });
      
      return `${quote}${newContent}${endQuote}`;
    }
    return match;
  });
}

// 导出 Vite 插件
export default function tailwindWxappTransform() {
  return {
    name: 'tailwind-wxapp-transform',
    enforce: 'pre', // 在其他插件之前运行
    
    transform(code, id) {
      // 只在编译微信小程序时运行
      if (process.env.UNI_PLATFORM !== 'mp-weixin') {
        return null;
      }
      
      // 只处理 Vue、JS 和 CSS 文件
      if (!/\.(vue|js|jsx|ts|tsx|css|scss|less)$/.test(id)) {
        return null;
      }
      
      // 不处理 node_modules 中的文件
      if (id.includes('node_modules')) {
        return null;
      }
      
      let result = code;
      
      // 处理 Vue 模板和 CSS 中的类名
      // 注意处理顺序很重要，先处理特殊情况，再处理一般情况
      result = result.replace(hoverBracketHexColorRegex, transformHoverBracketHexColor);
      result = result.replace(bracketHexColorRegex, transformBracketHexColor);
      result = result.replace(fractionRegex, transformFraction);
      result = result.replace(bracketPercentRegex, transformBracketPercent);
      result = result.replace(bracketRegex, transformBracket);
      result = result.replace(hoverRegex, transformHover);
      result = result.replace(hexColorRegex, transformHexColor);
      
      // 处理 JS 中的类名字符串
      result = transformJsClassString(result);
      
      return {
        code: result,
        map: null // 不需要 source map
      };
    }
  };
}
