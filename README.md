# Todo App - 待办事项 + 习惯追踪

一个简洁高效的个人任务管理和习惯追踪应用。

## 功能特点

### 任务管理
- 添加/编辑/删除任务
- 设置截止日期
- 筛选视图：全部 / 今日待办 / 已完成
- 逾期任务自动提醒

### 习惯追踪
- 添加/编辑/删除习惯
- 每日打卡
- 连续打卡天数统计
- 13 周热力图可视化

## 技术栈

| 类型 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite |
| 状态管理 | Redux Toolkit |
| 路由 | React Router v6 |
| 样式 | Tailwind CSS v4 |
| 存储 | localStorage |
| 打包 | Capacitor |

## 在线访问

**网页版：** https://dreammakerBinBin.github.io/todo-app/

> 已部署到 GitHub Pages，可直接在手机浏览器中打开使用。

## Android APK 下载

**APK 文件：** [todo-app-debug.apk](todo-app-debug.apk)（4.1MB）

**安装说明：**
1. 下载 APK 到手机
2. 打开文件管理器点击安装
3. 如遇安全提示，需开启"允许安装未知来源应用"

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 项目结构

```
src/
├── components/      # 可复用组件
│   ├── TaskItem.tsx    # 任务项
│   ├── HabitItem.tsx   # 习惯项
│   ├── HeatMap.tsx     # 热力图
│   └── TabNav.tsx      # 底部导航
├── pages/           # 页面
│   ├── TasksPage.tsx   # 任务页面
│   └── HabitsPage.tsx  # 习惯页面
├── store/            # Redux store
│   ├── tasksSlice.ts   # 任务 slice
│   └── habitsSlice.ts  # 习惯 slice
├── hooks/            # 自定义 hooks
├── types/            # TypeScript 类型
└── App.tsx           # 根组件
```

## 开发说明

本项目使用 **多 Agent 方式** 开发：
- 主 Agent 负责协调和集成
- 子 Agent 并行开发各模块

详见 [brainstorming.md](brainstorming.md)

## 后续计划

- [x] Android APK 打包
- [ ] 提醒功能
- [ ] 数据导出/导入
- [ ] 云端同步

## 许可证

MIT
