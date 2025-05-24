module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    // 引入我们自定义的插件，用于处理微信小程序不支持的语法
    './postcss-tailwind-wxapp.js': {},
  }
}
