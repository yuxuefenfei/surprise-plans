# HTML Surprise Pages

一个基于纯 `HTML/CSS/JavaScript` 的互动网页编排项目。仓库中既包含若干单页动画原型，也包含已经串联完成的多页面成品站点。

当前已有三套计划：

- [plans/girlfriend-surprise](./plans/girlfriend-surprise/)：浪漫告白方向，主题为《给你的秘密宇宙》
- [plans/cyber-dossier](./plans/cyber-dossier/)：赛博侦探方向，主题为《赛博侦探机密档案》
- [plans/abyss-dive](./plans/abyss-dive/)：深海科考方向，主题为《深海记忆潜航》

## 项目结构

```text
html-design/
├─ README.md
├─ plans/
│  ├─ _template/
│  │  ├─ README.md
│  │  ├─ assets/
│  │  ├─ docs/
│  │  ├─ prototypes/
│  │  └─ site/
│  ├─ abyss-dive/
│  │  ├─ README.md
│  │  ├─ assets/
│  │  ├─ docs/
│  │  ├─ prototypes/
│  │  └─ site/
│  ├─ cyber-dossier/
│  │  ├─ README.md
│  │  ├─ assets/
│  │  ├─ docs/
│  │  ├─ prototypes/
│  │  └─ site/
│  └─ girlfriend-surprise/
│     ├─ README.md
│     ├─ docs/
│     │  ├─ 页面剧情与文案策划.md
│     │  └─ 文案替换清单.md
│     ├─ prototypes/
│     │  ├─ idea1_stars.html
│     │  ├─ idea2_password.html
│     │  ├─ idea3_timeline.html
│     │  ├─ idea4_letter.html
│     │  └─ idea5_heart.html
│     └─ site/
│        ├─ index.html
│        ├─ 01-password.html
│        ├─ 02-timeline.html
│        ├─ 03-letter.html
│        ├─ 04-heart.html
│        └─ 05-stars.html
├─ scripts/
└─ ...
```

## 内容说明

### 计划目录

每个 `plans/<plan-name>/` 都代表一个完整的网页编排计划，内部按下面约定放置：

- `prototypes/`：早期原型、效果实验、来自 `idea*.html` 的单页草案
- `site/`：已经编排完成、可直接打开或部署的正式网站
- `docs/`：剧情策划、文案替换清单、维护说明等 Markdown 文档
- `assets/`：图片、音频、视频、字体等项目素材，有需要时再创建

### 当前计划

#### Girlfriend Surprise

`plans/girlfriend-surprise/prototypes/` 下的 `idea*.html` 是单页实验原型，适合做独立效果预览或继续拆分复用：

- [idea1_stars.html](./plans/girlfriend-surprise/prototypes/idea1_stars.html)：星点聚合成名字
- [idea2_password.html](./plans/girlfriend-surprise/prototypes/idea2_password.html)：密码解锁入口
- [idea3_timeline.html](./plans/girlfriend-surprise/prototypes/idea3_timeline.html)：时间轴叙事
- [idea4_letter.html](./plans/girlfriend-surprise/prototypes/idea4_letter.html)：信封与信件动效
- [idea5_heart.html](./plans/girlfriend-surprise/prototypes/idea5_heart.html)：爱心脉冲与粒子爆发

### 正式成品

[plans/girlfriend-surprise/site](./plans/girlfriend-surprise/site/) 是当前已经串联完成的正式版本，页面顺序如下：

1. [index.html](./plans/girlfriend-surprise/site/index.html)：开场页
2. [01-password.html](./plans/girlfriend-surprise/site/01-password.html)：专属解锁页
3. [02-timeline.html](./plans/girlfriend-surprise/site/02-timeline.html)：时间线页
4. [03-letter.html](./plans/girlfriend-surprise/site/03-letter.html)：信件页
5. [04-heart.html](./plans/girlfriend-surprise/site/04-heart.html)：心跳页
6. [05-stars.html](./plans/girlfriend-surprise/site/05-stars.html)：星光收尾页

如果只想预览完整作品，请从 [plans/girlfriend-surprise/site/index.html](./plans/girlfriend-surprise/site/index.html) 打开。

#### Cyber Dossier

[plans/cyber-dossier/site](./plans/cyber-dossier/site/) 是一套赛博侦探风格的机密档案互动站点，页面顺序如下：

1. [index.html](./plans/cyber-dossier/site/index.html)：案件接入页
2. [01-briefing.html](./plans/cyber-dossier/site/01-briefing.html)：任务简报页
3. [02-evidence.html](./plans/cyber-dossier/site/02-evidence.html)：证据墙页
4. [03-intercept.html](./plans/cyber-dossier/site/03-intercept.html)：信号截获页
5. [04-reconstruction.html](./plans/cyber-dossier/site/04-reconstruction.html)：事件重构页
6. [05-verdict.html](./plans/cyber-dossier/site/05-verdict.html)：结案报告页

如果只想预览完整作品，请从 [plans/cyber-dossier/site/index.html](./plans/cyber-dossier/site/index.html) 打开。

#### Abyss Dive

[plans/abyss-dive/site](./plans/abyss-dive/site/) 是一套深海科考与记忆深潜风格的沉浸式互动站点，页面顺序如下：

1. [index.html](./plans/abyss-dive/site/index.html)：浅海启航页 (0m)
2. [01-twilight.html](./plans/abyss-dive/site/01-twilight.html)：微光层探索页 (200m)
3. [02-sonar.html](./plans/abyss-dive/site/02-sonar.html)：午夜区声呐页 (1000m)
4. [03-pressure.html](./plans/abyss-dive/site/03-pressure.html)：深渊水压解谜页 (4000m)
5. [04-resonance.html](./plans/abyss-dive/site/04-resonance.html)：海沟热泉共振页 (6000m)
6. [05-challenger.html](./plans/abyss-dive/site/05-challenger.html)：挑战者深渊终极回响页 (10000m)

如果只想预览完整作品，请从 [plans/abyss-dive/site/index.html](./plans/abyss-dive/site/index.html) 打开。

## 技术特点

- 零依赖，无需安装包管理器或构建工具
- 全部为静态文件，适合本地直接打开或部署到任意静态托管平台
- 单文件 HTML 页面便于复制、归档和快速定制
- 多数页面通过顶部 `CONFIG` 常量维护文案与关键配置
- 自带响应式布局，适配桌面端与移动端
- 含 `prefers-reduced-motion` 降级处理，兼顾动效可达性

## 使用方式

### 本地打开

直接双击以下文件即可开始完整体验：

- [plans/girlfriend-surprise/site/index.html](./plans/girlfriend-surprise/site/index.html)

由于页面之间依赖相对路径跳转，建议总是从 `index.html` 进入。

### 静态部署

项目适合直接部署到：

- GitHub Pages
- Vercel
- Netlify
- 任意支持静态文件托管的服务器

部署时保留目录结构即可，不需要打包构建。

## Girlfriend Surprise 的文案定位

`plans/girlfriend-surprise/site` 版本的文案已经统一到下面的方向：

- 温柔克制
- 偏生活化
- 强调“日常里慢慢生长出来的偏爱”
- 重要日期主要集中在时间轴页呈现
- 其他页面更像一封分章节展开的情书

## 如何继续定制

如果你想继续替换 `girlfriend-surprise` 的人物信息或故事细节，优先参考下面两份内部文档：

- [页面剧情与文案策划.md](./plans/girlfriend-surprise/docs/页面剧情与文案策划.md)
- [文案替换清单.md](./plans/girlfriend-surprise/docs/文案替换清单.md)

如果你想继续替换 `cyber-dossier` 的目标代号、证据线索或最终揭示，优先参考：

- [页面剧情与文案策划.md](./plans/cyber-dossier/docs/页面剧情与文案策划.md)
- [文案替换清单.md](./plans/cyber-dossier/docs/文案替换清单.md)
- [谜题与线索设计.md](./plans/cyber-dossier/docs/谜题与线索设计.md)

如果你想继续替换 `abyss-dive` 的领航员称呼、水母记忆、声呐坐标或最终真言，优先参考：

- [页面剧情与文案策划.md](./plans/abyss-dive/docs/页面剧情与文案策划.md)
- [文案替换清单.md](./plans/abyss-dive/docs/文案替换清单.md)
- [谜题与线索设计.md](./plans/abyss-dive/docs/谜题与线索设计.md)
- [配置蓝图.md](./plans/abyss-dive/docs/配置蓝图.md)

常见的可编辑字段包括：

- `pageTitle`
- `modalTitle`
- `modalDesc`
- `hintText`
- `nextLabel`
- `heroTitle`
- `events`
- `letterTitle`
- `letterParagraphs`
- `headlineText`
- `targetName`

## 适合这个仓库的后续工作

- 把多页成品的共享人物信息抽成统一配置
- 增加截图或录屏预览
- 增加一个简单本地预览脚本
- 为不同场景扩展多套文案风格版本
- 基于 [plans/_template](./plans/_template/) 复制新的网页编排计划
