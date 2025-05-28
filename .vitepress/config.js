import { defineConfig } from 'vitepress'
import fixKatex from './fix-katex'

export default defineConfig({
  lang: 'zh-CN',
  head: [
    // 字体支持
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/regular.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Serif+SC' }],
    // Waline
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.css' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js' }],
    // giscus
    ['script', { src: 'https://giscus.app/client.js', 'data-repo': 'Arr-02/Arr-02.github.io', 'data-repo-id': '你的仓库ID', 'data-category': 'Announcements', 'data-category-id': '你的分类ID', 'data-mapping': 'pathname', 'data-strict': '0', 'data-reactions-enabled': '1', 'data-emit-metadata': '0', 'data-input-position': 'bottom', 'data-theme': 'light', 'data-lang': 'zh-CN', crossorigin: 'anonymous', async: '' }],
    // katex
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/contrib/auto-render.min.js' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css' }],
  ],
  markdown: {
    theme: 'github-light',
    lineNumbers: true,
    config: md => {
      md.use(fixKatex)
    }
  },
  themeConfig: {
    name: 'Arr-02',
    cover: '/60651947_p0.jpg',
    hello: '你好，我是 Arr-02',
    motto: '欢迎来到我的世界！！！',
    social: [
      { icon: 'fa-github', url: 'https://github.com/Arr-02' },
    ],
    // Waline 评论系统配置
    waline: {
      serverURL: 'https://waline-server-pi-five.vercel.app', // 你的 Waline 服务端地址
      pageview: true, // 开启文章阅读量统计
      comment: true,  // 开启评论功能
      locale: {
        placeholder: '说点什么吧...' // 评论框占位符
      },
      dark: 'auto', // 自动适应暗色模式
      emoji: [
        '//unpkg.com/@waline/emojis@1.1.0/weibo',
        '//unpkg.com/@waline/emojis@1.1.0/bilibili'
      ] // 添加表情包支持
    }
  }
}) 