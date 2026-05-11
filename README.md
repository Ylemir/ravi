# Ravi

> 一个基于 Vue 3 的现代化 Web 应用，使用 Vite 构建

## 特性

- 🚀 **Vue 3** - 使用最新的 Vue 3 Composition API
- ⚡ **Vite** - 极速开发体验
- 🎨 **Naive UI** - 高质量的 Vue 3 组件库
- 💪 **TypeScript** - 类型安全
- 📦 **Pinia** - 轻量级状态管理
- 🌐 **Vue i18n** - 国际化支持（中/英文）
- 🎯 **UnoCSS** - 原子化 CSS 引擎
- 🚦 **自动路由** - 基于文件系统的路由生成（unplugin-vue-router）
- 📝 **自动导入** - API 和组件自动导入
- 🎭 **布局系统** - 基于 vite-plugin-vue-layouts
- ✨ **ESLint** - 代码规范检查

## 技术栈

- **框架**: Vue 3.5+
- **构建工具**: Vite 8+
- **UI 组件库**: Naive UI 2.41+
- **状态管理**: Pinia 3+
- **路由**: Vue Router 5+ (自动路由)
- **CSS**: UnoCSS
- **国际化**: Vue i18n 11+
- **类型检查**: TypeScript 6+, vue-tsc
- **包管理器**: pnpm 10+

## 项目结构

```
ravi/
├── src/
│   ├── components/     # 组件
│   │   ├── Application/   # 应用主组件
│   │   ├── Common/        # 通用组件（Header, Footer 等）
│   │   ├── Fragment/      # 片段组件
│   │   ├── Grid/          # 网格组件
│   │   ├── Search/        # 搜索相关组件
│   │   └── ...
│   ├── composables/    # 组合式函数
│   ├── enum/          # 枚举定义
│   ├── layouts/       # 布局组件
│   ├── modules/       # 功能模块
│   ├── pages/         # 页面（自动路由）
│   ├── store/         # Pinia 状态管理
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── locales/          # 国际化文件
│   ├── en.yml         # 英文
│   └── zh.yml         # 中文
├── public/            # 静态资源
├── index.html         # HTML 入口
├── vite.config.ts     # Vite 配置
├── unocss.config.ts   # UnoCSS 配置
├── tsconfig.json      # TypeScript 配置
└── package.json       # 项目配置
```

## 快速开始

### 环境要求

- Node.js >= 24
- pnpm >= 10

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

启动开发服务器，默认自动打开浏览器，支持热更新。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（支持 --host 0.0.0.0） |
| `pnpm build` | 构建 SPA 生产版本 |
| `pnpm preview` | 预览生产构建结果 |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm fix` | 自动修复 ESLint 错误 |
| `pnpm typecheck` | 运行 TypeScript 类型检查 |
| `pnpm up` | 更新依赖到最新版本 |

## 开发指南

### 添加新页面

在 `src/pages/` 目录下创建 Vue 组件，路由将自动生成。

### 添加组件

- **全局组件**: 放在 `src/components/` 目录，自动注册
- **局部组件**: 直接在页面中导入使用

### 添加状态管理

在 `src/store/` 目录下创建 Pinia store。

### 国际化

编辑 `locales/` 目录下的 YAML 文件：
- `en.yml` - 英文翻译
- `zh.yml` - 中文翻译

## License

MIT
