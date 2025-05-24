# UniApp 项目 TailwindCSS 微信小程序兼容方案

## 项目目标

在 UniApp 项目中使用 TailwindCSS，并解决微信小程序不支持的语法问题，包括：

- 分数语法（如 `h-1/2`）
- 方括号语法（如 `h-[50px]`）
- 方括号内的百分比语法（如 `w-[80%]`）
- 十六进制颜色（如 `bg-#ffffff`）
- 方括号内的十六进制颜色（如 `bg-[#ff6b6b]`）
- 伪类语法（如 `hover:xxx`）
- 伪类中的方括号十六进制颜色（如 `hover:bg-[#ee5253]`）
- 通配符选择器（如 `*`）

## 解决方案

我们采用了两层处理策略：

1. **CSS 文件处理**：使用 PostCSS 插件处理编译后的 TailwindCSS 样式
2. **源文件处理**：使用 Vite 插件在编译时处理 Vue、JS 等文件中的类名

### 关键文件

1. `plugins/postcss-tailwind-wxapp.js` - 自定义 PostCSS 插件，处理不兼容的 CSS 语法
2. `plugins/tailwind-wxapp-transform.js` - 自定义 Vite 插件，处理源文件中的类名
3. `plugins/tailwind-compiler.js` - 自动编译 TailwindCSS 并处理兼容性

## 处理原理

### 不兼容语法处理

我们的 PostCSS 插件处理以下微信小程序不兼容的语法：

1. **分数语法**：`h-1/2` → `h-50`
2. **方括号语法**：`h-[50px]` → `h-50px`
3. **方括号内的百分比语法**：`w-[80%]` → `w-80percent`
4. **十六进制颜色**：`bg-#ffffff` → `bg-ffffff`
5. **方括号内的十六进制颜色**：`bg-[#ff6b6b]` → `bg-ff6b6b`
6. **伪类语法**：`hover:bg-blue-700` → `hover__bg-blue-700__hover`
7. **伪类中的方括号十六进制颜色**：`hover:bg-[#ee5253]` → `hover__bg-ee5253__hover`
8. **通配符选择器**：`*` → `view, text` 等微信小程序支持的元素
9. **px 转换为 rpx**：自动将所有 CSS 属性中的 px 单位转换为 rpx，比例为 1px = 2rpx

### 自动化流程

我们实现了完全自动化的编译流程：

1. `tailwind-compiler.js` - 自动编译 TailwindCSS 并使用 PostCSS 插件处理兼容性
2. `tailwind-wxapp-transform.js` - 处理源文件中的 TailwindCSS 类名，确保在模板中使用的类名也能正确转换

这两个插件只在编译微信小程序时运行，不影响其他平台。插件在 `vite.config.js` 中配置，只在 `process.env.UNI_PLATFORM === 'mp-weixin'` 时启用。

## 使用方法

### 配置 TailwindCSS

在 `tailwind.config.js` 中禁用不兼容的功能：

```js
// tailwind.config.js
export default {
  // ... 其他配置
  
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
```

### 简单三步走

1. **正常开发**：在组件中自由使用 TailwindCSS 类名，包括微信小程序不支持的语法

2. **编译微信小程序**：
```bash
# 使用 HBuilderX 或命令行编译
 npx uni build --platform mp-weixin
```

3. **编译其他平台**：
```bash
# 使用 HBuilderX 或命令行编译
npx uni build --platform h5
```

### 在 App.vue 中引入样式

```css
@import url('/styles/tailwind.wxapp.css');
```

## 注意事项

- 自定义插件只在编译微信小程序时运行，不影响其他平台
- 所有 CSS 属性中的 px 单位会自动转换为 rpx，比例为 1px = 2rpx
- 如果遇到新的不兼容语法，可以在 `postcss-tailwind-wxapp.js` 中添加相应的转换规则
- 对于使用复杂选择器的功能（如 space、divide 等），建议在 `tailwind.config.js` 中禁用