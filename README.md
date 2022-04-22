# gd-zy-wechat

基于`node v12.16.1` `npm v6.13.4`开发环境搭建的`Vue2.x + Vant2 + Less + Vue Router + Vuex`项目

## 脚本运行

```bash
yarn install        # 依赖安装
yarn serve          # 本地运行
yarn dev            # 本地运行
yarn build          # 正式环境打包
yarn build:test     # 测试环境打包
yarn lint           # 格式化代码
```

## 公共组件封装

- 标签栏 √
- 搜索、筛选
- 时间线 √
- 标签组件 √
- 按钮组 √

## 待做

- 定制主题
- 工具函数
- 算术工具库 decimal.js √
- axios 请求封装
- 公共组件封装
- 自定义指令 v-waves √
- 过滤器 √
- 公共样式
- less 全局变量 √

## 规范

### 代码编写

- vscode 用户建议安装 Vetur + eslint + Prettier - Code formatter （格式代码时建议使用 Prettier）
- [vue 规范]()

#### 如何忽略

- 1.[eslint](https://www.prettier.cn/docs/ignore.html)
- 2.[prettier](https://www.prettier.cn/docs/ignore.html)

## git 提交

- `"lint-staged": "8.1.5" + "husky": "1.3.1"` 约束 git 提交检测 eslint 并自动修复，部分需要手动修正！！！

### 文件命名

- **\*.vue** 在 views 目录下 命名规范同 js 命名规范；组件文件则以驼峰命名且首字母大写(如 MyCom)
- **\*.js** 命名遵循一个单词以全小写 name，多单词则以`-`连接 kebab-case

## vue.config.js 配置

- gzip 压缩 √

```
compression-webpack-plugin
```

## 业务

- md5 加密 √
- 权限判断

1.

### 更多配置

请查阅官方文档 [Vue CLi](https://cli.vuejs.org/config/)
