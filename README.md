# 多页面构建模版

构建出来多个 html 页面

### 构建准备

在 src 下放入页面，一个页面一个目录，目录名为页面名，目录内文件为 index.(acss|axml|js)

在目录里创建 index.json:

```json
{
  "dominoCompilerConfig": {
    "defaultComponentLib": "antd", // 使用的默认组件库
    "defaultComponentExportTags": ["Affix", "Anchor", "AutoComplete", "..."] // 默认组件库的所有可用标签
  },
  "usingComponents": { // 所有引用的第三方组件库
    "KBLoginModal": "@alipay/kb-loginmodal"
  },
  "defaultTitle": "page title" // 页面标题
}
```

如果有引用第三方 npm 包的组件库，还需要在 package.json 中的 dependencies 添加这个组件的依赖和版本号

### 构建
```
tnpm i
tnpm build
```

输出的文件在 /dist 下，页面入口是 [页面名称].html
