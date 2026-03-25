# 变更记录 (Changelog)

## [1.0.0] - 2026-03-25

### 首次发布

#### 新增功能

**Tasks（任务管理）**
- 添加新任务（标题 + 截止日期）
- 编辑任务
- 删除任务（带确认对话框）
- 完成任务（勾选标记）
- 筛选视图：全部 / 今日待办 / 已完成
- 逾期任务自动标记

**Habits（习惯追踪）**
- 添加新习惯
- 编辑习惯名称
- 删除习惯（带确认对话框）
- 每日打卡
- 连续打卡天数（streak）显示
- 13 周热力图可视化

**导航**
- 底部 Tab 导航（Tasks / Habits）
- React Router 路由管理

#### 技术变更

- 初始化 React + TypeScript 项目（Vite）
- 集成 Capacitor（为 Android 打包准备）
- 添加 Redux Toolkit 状态管理
- 配置 Tailwind CSS v4
- 实现 localStorage 持久化

#### 代码统计

- 新增文件：11 个
- 总代码行数：~1007 行

#### 部署信息

- **网页版：** https://dreammakerBinBin.github.io/todo-app/
- **GitHub 仓库：** https://github.com/dreammakerBinBin/todo-app
- **gh-pages 分支：** 用于 GitHub Pages 部署

## [1.0.1] - 2026-03-25

### Android APK 打包

#### 新增

- Android APK 构建成功
- APK 文件：`todo-app-debug.apk`（4.1MB）
- 应用包名：`com.todo.app`

#### 遇到的问题和解决方案

**问题 1：系统内存不足**
- 描述：Gradle daemon 因内存不足崩溃（15GB 物理内存被其他程序占用）
- 解决：关闭其他程序后重试

**问题 2：JDK 版本不兼容**
- 描述：Capacitor Android 8.13.0 要求 Java 21，但 JDK 17 不支持 sourceCompatibility 21
- 解决：安装 JDK 21（华为镜像下载）

**问题 3：Capacitor libs 目录缺失**
- 描述：`node_modules\@capacitor\android\capacitor\libs` 不存在
- 解决：运行 `npx cap sync android` 重新同步

#### 环境配置

| 工具 | 版本 | 路径 |
|------|------|------|
| JDK | 21.0.2 | E:\work\haungbb\jdk21\jdk-21.0.2 |
| Gradle | 8.14.3 | Android SDK 内置 |
| Android SDK | - | C:\Users\admin\AppData\Local\Android\sdk |
| AGP | 8.13.0 | Capacitor 依赖 |

## [1.0.2] - 2026-03-25

### Bug 修复

**问题：Android APK 空白页面**
- 描述：APK 安装后打开是空白页面，资源加载失败
- 原因：`vite.config.ts` 的 `base: '/todo-app/'` 使用绝对路径，Android 无法识别
- 解决：将 base 改为 `'./'` 使用相对路径

### 重新构建 APK
- APK 文件：`todo-app-debug.apk`（4.2MB）
- 重新同步 dist 到 android assets

## [1.0.3] - 2026-03-25

### Bug 修复

**问题 1：GitHub Pages 和 Android 构建路径冲突**
- 描述：GitHub Pages 需要 `base: '/todo-app/'`，Android 需要 `base: './'`
- 解决：Vite 配置检测 `CAPACITOR` 环境变量，为 Android 设置相对路径

**问题 2：GitHub Actions 部署权限不足**
- 描述：`peaceiris/actions-gh-pages@v3` 推送被拒绝 (403)
- 原因：GitHub Actions 默认没有写权限
- 解决：在 workflow 添加 `permissions: contents: write`

### 文档更新
- 更新 deploy.yml 添加权限配置
- 更新 vite.config.ts 支持多平台构建
