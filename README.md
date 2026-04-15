# HTML Surprise Pages

一个基于纯 `HTML/CSS/JavaScript` 的浪漫互动网页项目。仓库中既包含若干单页动画原型，也包含一套已经串联完成的多页面成品站点。

当前主线作品位于 [plans/girlfriend-surprise/site](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\site)，主题为《给你的秘密宇宙》。整套体验以“专属入口 + 时光回看 + 情书表达 + 心动强化 + 星光收束”为结构，适合做纪念日、生日、订婚、婚礼前告白等场景的静态网页礼物。

## 项目结构

```text
html-design/
├─ README.md
├─ idea1_stars.html
├─ idea2_password.html
├─ idea3_timeline.html
├─ idea4_letter.html
├─ idea5_heart.html
└─ plans/
   └─ girlfriend-surprise/
      ├─ 页面剧情与文案策划.md
      ├─ 文案替换清单.md
      └─ site/
         ├─ index.html
         ├─ 01-password.html
         ├─ 02-timeline.html
         ├─ 03-letter.html
         ├─ 04-heart.html
         └─ 05-stars.html
```

## 内容说明

### 动画原型

根目录下的 `idea*.html` 是单页实验原型，适合做独立效果预览或继续拆分复用：

- `idea1_stars.html`：星点聚合成名字
- `idea2_password.html`：密码解锁入口
- `idea3_timeline.html`：时间轴叙事
- `idea4_letter.html`：信封与信件动效
- `idea5_heart.html`：爱心脉冲与粒子爆发

### 正式成品

[plans/girlfriend-surprise/site](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\site) 是当前已经串联完成的正式版本，页面顺序如下：

1. `index.html`：开场页
2. `01-password.html`：专属解锁页
3. `02-timeline.html`：时间线页
4. `03-letter.html`：信件页
5. `04-heart.html`：心跳页
6. `05-stars.html`：星光收尾页

如果只想预览完整作品，请从 [site/index.html](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\site\index.html) 打开。

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

- [plans/girlfriend-surprise/site/index.html](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\site\index.html)

由于页面之间依赖相对路径跳转，建议总是从 `index.html` 进入。

### 静态部署

项目适合直接部署到：

- GitHub Pages
- Vercel
- Netlify
- 任意支持静态文件托管的服务器

部署时保留目录结构即可，不需要打包构建。

## 当前成品的文案定位

当前 `site` 版本的文案已经统一到下面的方向：

- 温柔克制
- 偏生活化
- 强调“日常里慢慢生长出来的偏爱”
- 重要日期主要集中在时间轴页呈现
- 其他页面更像一封分章节展开的情书

## 如何继续定制

如果你想继续替换人物信息或故事细节，优先参考下面两份内部文档：

- [页面剧情与文案策划.md](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\页面剧情与文案策划.md)
- [文案替换清单.md](C:\Users\13080\Workspace\html-design\plans\girlfriend-surprise\文案替换清单.md)

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
