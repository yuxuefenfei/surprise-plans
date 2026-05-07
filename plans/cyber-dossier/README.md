# Cyber Dossier

《赛博侦探机密档案》网页编排计划。

这是一套与 `girlfriend-surprise` 完全不同的个人惊喜网页：不走星空、爱心、情书和温柔告白，而是把内容包装成一次冷峻幽默的机密调查。

## 入口

- 成品网站：[site/index.html](./site/index.html)
- 原型页面：[prototypes/](./prototypes/)
- 策划文档：[docs/](./docs/)
- 本地视觉资产：[assets/](./assets/)

## 页面顺序

1. `index.html`：案件接入页
2. `01-briefing.html`：任务简报页
3. `02-evidence.html`：证据墙页
4. `03-intercept.html`：信号截获页
5. `04-reconstruction.html`：事件重构页
6. `05-verdict.html`：结案报告页

## 原型清单

- `idea1_terminal-boot.html`：终端启动、扫描线、故障字效
- `idea2_dossier-card.html`：机密档案卡片、权限解锁
- `idea3_evidence-board.html`：证据墙、线索高亮
- `idea4_signal-decode.html`：信号破译、短码输入
- `idea5_case-verdict.html`：结案报告、打印式揭示

## 维护说明

- 修改正式体验优先编辑 `site/`
- 替换人物信息和隐藏内容时看 `docs/文案替换清单.md`
- 调整谜题流程时看 `docs/谜题与线索设计.md`
- 案件进度轨道由 `assets/dossier-nav.js` 注入，页面阶段由每页 `CONFIG.stage` 控制
- 保持深黑、霓虹青绿、警戒黄的视觉系统，避免回到浪漫粉色调
