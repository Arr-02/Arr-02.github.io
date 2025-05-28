<template>
  <Header />
  <aside />
  <main>
    <ToTop />
    <template v-if="path === ''">
      <Banner />
      <BlogList :posts="posts" />
    </template>
    <Tag v-else-if="path === 'tags/'" />
    <Article v-else />
    <div v-if="path !== '' && path !== 'tags/'" id="waline" class="waline-container"></div>
  </main>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Banner from './Banner.vue'
import Article from './Article.vue'
import BlogList from './BlogList.vue'
import Tag from './Tag.vue'
import ToTop from './ToTop.vue'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import { data as posts } from '../posts.data'

const base = useData().site.value.base
const route = useRoute()
const path = computed(() => route.path.replace(base, '').replace('index.html', ''))

const { isDark, theme } = useData()
const walineInstance = ref<any>(null)

// 初始化 Waline
const initWaline = () => {
  // 销毁旧实例
  if (walineInstance.value?.destroy) {
    walineInstance.value.destroy()
  }

  try {
    // @ts-ignore
    const waline = window.Waline({
      el: '#waline',
      serverURL: 'https://waline-server-pi-five.vercel.app',
      pageview: true,
      comment: true,
      locale: {
        placeholder: '说点什么吧...'
      },
      dark: 'auto',
      emoji: [
        '//unpkg.com/@waline/emojis@1.1.0/weibo',
        '//unpkg.com/@waline/emojis@1.1.0/bilibili'
      ],
      path: route.path,
      // 添加错误处理
      errorHandler: (err: any) => {
        console.error('Waline error:', err)
      }
    })

    walineInstance.value = waline
  } catch (e) {
    console.error('Failed to initialize Waline:', e)
  }
}

// 监听路由变化
watch(() => route.path, () => {
  if (walineInstance.value?.update) {
    walineInstance.value.update()
  }
})

// 组件挂载时初始化
onMounted(() => {
  // 等待页面完全加载
  if (document.readyState === 'complete') {
    initWaline()
  } else {
    window.addEventListener('load', initWaline)
  }
})

// 声明全局类型
declare global {
  interface Window {
    Waline: (options: any) => any
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
  --global-font: "Noto Serif SC", "MicroSoft Yahei", serif;
  --color-accent: #fe9600;
  --color-gray: #666;
  --color-text: #02111d;
  --color-background: #eee;
  --color-border: #d0d7de;
  --code-line-height: 24px;
  --code-font-family: monospace;
  --code-font-size: 15px;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--global-font);
  font-size: 16px;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}

hr {
  border: none;
  border-bottom: 1px dashed var(--color-border);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--color-accent);
}

.waline-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  min-height: 200px;
  background: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.waline-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
