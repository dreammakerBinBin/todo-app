# 使用的技能（Skills）

本次开发使用了以下技能：

## 主 Agent 使用的技能

### 1. brainstorming
**用途：** 需求分析和技术方案设计

**使用阶段：**
- 确定项目类型（Android App）
- 需求澄清（任务管理 + 习惯追踪）
- 技术栈选择（Capacitor + React + Redux Toolkit）
- UI/UX 设计方向

**文件：** `docs/superpowers/specs/2026-03-25-todo-app-design.md`

### 2. superpowers:brainstorming
**说明：** 这是官方技能，用于协作式头脑风暴和设计。

### 3. superpowers:using-superpowers
**说明：** 了解如何使用其他技能，包括何时调用技能。

### 4. superpowers:dispatching-parallel-agents
**用途：** 多 Agent 并行开发

**使用方式：**
- 同时启动 2 个子 Agent
- 子 Agent 1 负责 Tasks 模块
- 子 Agent 2 负责 Habits 模块

### 5. systematic-debugging
**用途：** 问题诊断和修复

**解决的问题：**
- TypeScript 编译错误修复
- Tailwind CSS v4 PostCSS 配置问题
- 未使用变量警告

## 子 Agent 使用的技能

### general-purpose
**用途：** 通用任务执行

**执行内容：**
- 创建 Redux store 和 slices
- 开发 React 组件
- 实现 UI 交互逻辑
- 集成 localStorage 持久化

## 技能使用统计

| 技能 | 使用次数 | 使用阶段 |
|------|----------|----------|
| brainstorming | 1 | 需求设计 |
| dispatching-parallel-agents | 1 | 开发分工 |
| systematic-debugging | 1 | 问题修复 |

## 技能学习

本次开发验证了多 Agent 协作的可行性：
1. 主 Agent 负责协调和复杂决策
2. 子 Agent 负责具体模块开发
3. 通过并行执行提高开发效率
4. 主 Agent 最终负责集成和验收
