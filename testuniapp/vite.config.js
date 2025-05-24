import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindWxappTransform from './plugins/tailwind-wxapp-transform';
import tailwindCompiler from './plugins/tailwind-compiler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // 只在编译微信小程序时使用这些插件
    process.env.UNI_PLATFORM === 'mp-weixin' ? tailwindCompiler() : null,
    process.env.UNI_PLATFORM === 'mp-weixin' ? tailwindWxappTransform() : null
  ].filter(Boolean),
  css: {
    // 启用 PostCSS 处理
    postcss: {
      // 这里的配置会与 postcss.config.js 合并
    }
  }
});
