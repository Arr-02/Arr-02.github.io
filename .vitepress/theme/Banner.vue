<template>
  <div class="banner" :style="`background-image: url(${cover})`">
    <div class="wave1"></div>
    <div class="wave2"></div>
    <div class="info">
      <GlitchText :text="hello" />
      <span class="box">
        <p class="text">
          <i class="fa fa-quote-left"></i>
          {{ motto }}
          <i class="fa fa-quote-right"></i>
        </p>
        <div class="contact">
          <a :href="s.url" v-for="s in social" aria-label="icon" target="_blank">
            <i :class="['fab', s.icon]"></i>
          </a>
        </div>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import GlitchText from './GlitchText.vue'
const themeConfig = useData().theme.value
const hello = themeConfig.hello || 'Hello, sakura'
const motto = themeConfig.motto || 'You got to put the past behind you before you can move on.'
const social = themeConfig.social || []
const cover = themeConfig.cover
</script>

<style lang="scss">
@import "./base.scss";

.banner {
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wave1,
  .wave2 {
    position: absolute;
    width: 400%;
    bottom: 0;
  }

  .wave1 {
    background: url($theme-base+"assets/wave1.png") repeat-x;
    height: 65px;
    animation: wave-animation-1 30s infinite linear;
  }

  .wave2 {
    background: url($theme-base+"assets/wave2.png") repeat-x;
    height: 80px;
    animation: wave-animation-2 20s infinite linear;
  }

  .info {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .box {
    display: inline-block;
    width: 600px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    margin-top: 16px;
    backdrop-filter: blur(5px);
  }

  .text {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    padding: 0 1rem;
  }

  .contact {
    display: flex;
    justify-content: center;
    font-size: 24px;
    padding: 12px 0;

    a {
      color: white;
      margin: 6px;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

@media (max-width: 720px) {
  .banner {
    height: 60vh;
    min-height: 400px;

    .info {
      transform: translate(-50%, -50%) scale(0.8);
    }

    .box {
      width: 90%;
      max-width: 400px;
      margin: 1rem auto;
    }

    .text {
      font-size: 14px;
      line-height: 1.6;
      margin: 0.8em 0;
    }

    .contact {
      font-size: 20px;
      padding: 8px 0;

      a {
        margin: 4px;
      }
    }
  }
}

@media (max-width: 480px) {
  .banner {
    height: 50vh;
    min-height: 300px;

    .info {
      transform: translate(-50%, -50%) scale(0.7);
    }

    .box {
      width: 95%;
    }

    .text {
      font-size: 13px;
      margin: 0.6em 0;
    }

    .contact {
      font-size: 18px;
    }
  }
}

@keyframes wave-animation-1 {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes wave-animation-2 {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}
</style>
