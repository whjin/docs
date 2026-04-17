> 以 `React` 为 `UI` 核心，`UmiJS` 为应用框架提供工程化和路由能力，`Dva` 为数据流方案统一管理状态和异步逻辑。

| 技术    | 定位                      | 职责                                                                                              |
| ------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `React` | 声明式 `UI` 库            | 负责组件渲染和用户交互                                                                            |
| `UmiJS` | 企业级 `React` 应用框架   | 路由管理、工程化构建、插件体系、微前端支持，内置 `Dva` 插件，自动注册 `Model` 并提供 `hooks` 访问 |
| `Dva`   | 基于 `Redux` 的数据流方案 | 状态管理、异步逻辑处理、副作用管理                                                                |

## `UmiJS` 核心技术

基于路由，支持约定式路由和配置式路由，核心是插件化架构

### 1. 路由系统

- **约定式路由（文件路由）**
  无需手动配置，`UmiJS` 会自动根据 `src/pages` 目录结构生成路由配置。
  - 基础路由：`pages/index.tsx` -> `/`，`pages/users.tsx` -> `/users`
  - 动态路由：目录或文件下以 `$` 开头，如 `pages/users/$id.tsx` -> `/users/:id`
  - 嵌套路由：目录下的 `_layout.tsx` 作为父布局，子文件作为子路由
  - `404` 路由：`pages/404.tsx` 会自动作为全局 `404` 页面

```react
src/pages/
├── index.tsx        # 路由 /
├── users/
│   ├── _layout.tsx  # 父布局
│   ├── index.tsx    # 路由 /users
│   └── $id.tsx      # 路由 /users/:id
└── 404.tsx          # 全局404
```

2. **配置式路由**
   在 `.umirc.ts` 或 `config/config.ts` 中通过 `router` 数组显式配置路由时，适合复杂业务场景。

```typescript
// config/config.ts
export default {
  routes: [
    { path: '/', component: './index' },
    {
      path: '/users',
      component: './users/_layout',
      routes: [
        { path: '/users', component: './users/index' },
        { path: '/users/:id', component: './users/$id' },
      ],
    },
    { path: '*', component: './404' },
  ],
};
```

3. **路由核心能力**

- **路由跳转**：声明式(`<Link>` 组件)和命令式（`history.push()`）
- **路由守卫**：通过 `Routes` 配置项实现权限控制
- **路由参数**：动态路由参数、`query` 参数、`state` 参数
- **路由懒加载**：自动实现路由级代码分割

### 2. 插件体系

`UmiJS` 的核心是 **插件化架构**，所有功能都通过插件实现。官方提供了 `@umijs/preset-react` 插件集，包含了企业级开发常用的所有功能。

| 插件                    | 功能                                               |
| ----------------------- | -------------------------------------------------- |
| `@umijs/plugin-dva`     | 集成 `Dva` 数据流方案                              |
| `@umijs/plugin-antd`    | 集成 `Ant Design`，自动按需加载                    |
| `@umijs/plugin-layout`  | 集成 `Ant Design Pro` 风格的全局布局               |
| `@umijs/plugin-request` | 基于 `umi-request`的统一请求方案                   |
| `@umijs/plugin-access`  | 权限管理，支持路由级和按钮级权限                   |
| `@umijs/plugin-locale`  | 国际化支持                                         |
| `@umijs/plugin-model`   | 基于 `hooks` 的简易数据流（替代 `Dva` 的轻量方案） |
| `@umijs/plugin-qiankun` | 微前端支持                                         |
