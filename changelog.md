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
