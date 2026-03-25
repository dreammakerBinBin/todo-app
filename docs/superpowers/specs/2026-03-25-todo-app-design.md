# Todo App (待办事项 + 习惯追踪) 设计文档

## 1. Overview

- **项目名称**: TodoApp
- **项目类型**: Android App (Capacitor + React)
- **核心功能**: 个人任务管理 + 习惯追踪打卡
- **目标用户**: 个人用户，用于管理日常任务和养成好习惯

## 2. 技术栈

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | React 18 + TypeScript | 主流前端框架 |
| 构建工具 | Vite | 快速的构建工具 |
| 状态管理 | Redux Toolkit | 官方推荐的状态管理 |
| 路由 | React Router v6 | SPA 路由管理 |
| 本地存储 | Capacitor Storage / localStorage | 本地数据持久化 |
| 打包工具 | Capacitor | Web 转 Android App |
| UI 美化 | ui-ux-pro-max (shadcn/ui) | 现代 UI 组件库 |
| 图表 | 原生 CSS 热力图 | 轻量实现 |

## 3. Architecture (Clean Architecture)

```
src/
├── components/      # 可复用 UI 组件
│   ├── TaskItem.tsx
│   ├── HabitItem.tsx
│   ├── HeatMap.tsx
│   └── TabNav.tsx
├── pages/           # 页面组件
│   ├── TasksPage.tsx
│   └── HabitsPage.tsx
├── store/           # Redux store
│   ├── tasksSlice.ts
│   └── habitsSlice.ts
├── hooks/           # 自定义 hooks
│   └── useLocalStorage.ts
├── utils/           # 工具函数
│   └── dateUtils.ts
├── types/           # TypeScript 类型定义
│   └── index.ts
├── App.tsx          # 根组件
└── main.tsx         # 入口文件
```

## 4. 功能模块

### 4.1 任务管理 (Tasks)

| 功能 | 描述 |
|------|------|
| 添加任务 | 输入任务名称，可选设置截止日期 |
| 编辑任务 | 修改任务名称和截止日期 |
| 删除任务 | 删除任务（带确认） |
| 完成任务 | 点击勾选标记完成 |
| 筛选视图 | 全部 / 今日待办 / 已完成 |

### 4.2 习惯追踪 (Habits)

| 功能 | 描述 |
|------|------|
| 添加习惯 | 输入习惯名称 |
| 编辑习惯 | 修改习惯名称 |
| 删除习惯 | 删除习惯（带确认） |
| 每日打卡 | 点击打卡按钮记录完成 |
| 连续天数 | 显示 streak（连续打卡天数） |
| 热力图 | 展示最近 3 个月的打卡情况 |

### 4.3 导航

- 底部 Tab 导航：Tasks | Habits

## 5. Data Models

### Task
```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // ISO date string
  createdAt: string;
}
```

### Habit
```typescript
interface Habit {
  id: string;
  title: string;
  createdAt: string;
  completions: string[]; // Array of ISO date strings
}
```

## 6. UI 设计

### 视觉风格
- Material Design 3
- 简洁现代的卡片式布局
- 圆角设计 (8px-12px)

### 颜色方案
- 主色: #6366F1 (Indigo)
- 背景: #F8FAFC (浅灰白)
- 卡片: #FFFFFF (白色)
- 文字: #1E293B (深灰)
- 成功: #22C55E (绿色)
- 边框: #E2E8F0

### 热力图颜色
- 无记录: #E2E8F0 (灰色)
- 1-2次: #BBF7D0 (浅绿)
- 3-4次: #86EFAC (中绿)
- 5次以上: #22C55E (深绿)

## 7. 验证方式

1. `npm run dev` 启动开发服务器
2. 手动测试：添加/编辑/删除任务，添加/打卡习惯
3. `npm run build` 构建生产版本
4. `npx cap sync` 同步到 Android 项目
