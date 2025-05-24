/**
 * Vite 插件：自动编译 TailwindCSS 并处理 CSS 文件
 * 1. 编译 TailwindCSS (npx tailwindcss -i ./styles/tailwind.css -o ./styles/tailwind.output.css)
 * 2. 处理 CSS 文件，使其与微信小程序兼容 (node process-tailwind.js)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

const execAsync = promisify(exec);

import { fileURLToPath } from 'url';

// 获取当前文件的目录
// 注意：在 ESM 中，__dirname 不可用，需要使用 fileURLToPath 来获取
// 如果您使用的是 CommonJS，可以直接使用 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 导出 Vite 插件
export default function tailwindCompiler() {
  return {
    name: 'tailwind-compiler',
    enforce: 'pre', // 在其他插件之前运行
    
    async buildStart() {
      console.log('🚀 开始编译 TailwindCSS...');
      console.log('rootDir:', rootDir);
      
      try {
        // 步骤 1：编译 TailwindCSS
        await execAsync('npx tailwindcss -i ./styles/tailwind.css -o ./styles/tailwind.output.css', {
          cwd: rootDir
        });
        console.log('✅ TailwindCSS 编译完成');
        
        // 步骤 2：处理 CSS 文件，使其与微信小程序兼容
        // 定义输入和输出文件路径
        const inputCssPath = path.resolve(rootDir, 'styles/tailwind.output.css');
        const outputCssPath = path.resolve(rootDir, 'styles/tailwind.wxapp.css');
        
        // 加载 PostCSS 插件
        const tailwindWxappPlugin = require(path.resolve(rootDir, 'plugins/postcss-tailwind-wxapp'));
        
        // 读取 CSS 文件
        const css = fs.readFileSync(inputCssPath, 'utf8');
        
        // 使用 PostCSS 处理 CSS
        const result = await postcss([tailwindWxappPlugin()])
          .process(css, { from: inputCssPath, to: outputCssPath });
        
        // 写入处理后的 CSS 文件
        fs.writeFileSync(outputCssPath, result.css);
        console.log('✅ 微信小程序兼容的 CSS 文件生成完成');
      } catch (error) {
        console.error('❌ TailwindCSS 编译过程中出错：', error);
      }
    }
  };
}
