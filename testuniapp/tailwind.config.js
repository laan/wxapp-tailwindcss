/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx,uvue}',
    './components/**/*.{vue,js,ts,jsx,tsx,uvue}',
    './App.{vue,uvue}',
    './main.{js,ts,uts}',
    './src/**/*.{vue,js,ts,jsx,tsx,uvue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // 禁用不支持的功能
  corePlugins: {
    // 禁用 space 插件，避免生成使用 :not([hidden]) 选择器的 CSS
    space: false,
    // 其他不兼容的功能
    divideWidth: false,
    divideColor: false,
    divideStyle: false,
    divideOpacity: false
  }
}
