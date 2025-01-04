<template>
  <div id="app" :class="theme">
    <button class="theme-toggle" @click="toggleTheme">
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </button>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'dark'
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme)
  }
}
</script>

<style>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1.2em;
  background: var(--primary-color);
  color: var(--text-color);
  border: none;
  outline: none;
}
</style>
