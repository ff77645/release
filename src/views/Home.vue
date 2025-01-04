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
    const response = await fetch('/data/apps.json')
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
}

.search-input {
  padding: 8px;
  width: 300px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.app-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>