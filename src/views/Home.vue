<template>
  <div class="home">
    <h1>App Showcase</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search apps..."
      class="search-input"
    />
    <div class="app-list">
      <AppCard v-for="app in filteredApps" :key="app.id" :app="app" />
    </div>
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

.search-input {
  padding: 8px;
  width: 90%;
  max-width: 300px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
</style>
