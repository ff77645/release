<template>
  <div class="home">
    <h1>应用中心</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search apps..."
      class="search-input"
    />
    <div class="app-list">
      <AppCard 
        v-for="app in filteredApps" 
        :key="app.id" 
        :app="app"
        @showtip="showGlobalTip"
      />
    </div>
    <transition name="fade">
      <div v-if="showTip" class="global-tip fixed-tip">
        <span class="tip-icon">!</span>
        点击下载没反应可复制下载链接自行下载
      </div>
    </transition>
  </div>
</template>

<script>
import AppCard from '../components/AppCard.vue'
import {baseUrl} from '../config.js'

export default {
  components: {
    AppCard,
  },
  data() {
    return {
      apps: [],
      searchQuery: '',
      showTip: false
    }
  },
  methods: {
    showGlobalTip() {
      this.showTip = true
      setTimeout(() => {
        this.showTip = false
      }, 3000)
    }
  },
  provide() {
    return {
      showGlobalTip: this.showGlobalTip
    }
  },
  async created() {
    const response = await fetch(baseUrl+'/data/apps.json')
    this.apps = await response.json()
  },
  computed: {
    filteredApps() {
      return this.apps.filter((app) =>
        app.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

:root {
  --search-border: #42b983;
  --search-focus-border: #369f6e;
  --search-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --search-focus-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  --search-bg: #ffffff;
  --search-text: #333333;
  --search-placeholder: #999999;
  --search-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
}

@media (prefers-color-scheme: dark) {
  :root {
    --search-border: #42b983;
    --search-focus-border: #369f6e;
    --search-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    --search-focus-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    --search-bg: #1f2937;
    --search-text: #f3f4f6;
    --search-placeholder: #9ca3af;
    --search-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
  }
}

.search-input {
  padding: 12px 16px 12px 48px;
  width: 90%;
  max-width: 400px;
  margin: 20px auto 40px;
  border: 2px solid var(--search-border);
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: var(--search-shadow);
  background-color: var(--search-bg);
  color: var(--search-text);
  background-image: var(--search-icon);
  background-repeat: no-repeat;
  background-position: 16px center;
  background-size: 20px;
}

.search-input:focus {
  border-color: var(--search-focus-border);
  box-shadow: var(--search-focus-shadow);
  transform: scale(1.02);
}

.search-input::placeholder {
  color: var(--search-placeholder);
  font-style: italic;
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  gap: 16px;
  justify-content: center;
  padding: 0 16px;
  width: 100%;
}

@media (max-width: 768px) {
  .home {
    padding: 16px;
  }
  
  .app-list {
    gap: 12px;
    padding: 0 8px;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 12px;
  }
  
  .app-list {
    gap: 8px;
    padding: 0 4px;
  }
}

.global-tip {
  margin: 20px auto 0;
  padding: 12px;
  background: #fff3cd;
  border-radius: 4px;
  color: #856404;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 800px;
}

.fixed-tip {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideDown {
  from {
    transform: translate(-50%, -20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.tip-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #856404;
  color: white;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .global-tip {
    margin: 16px 16px 0;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .global-tip {
    margin: 12px 12px 0;
    font-size: 12px;
    padding: 10px;
  }
  
  .tip-icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
  }
}
</style>
