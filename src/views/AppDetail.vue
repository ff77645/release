<template>
  <div class="app-detail">
    <h1>{{ app.name }}</h1>
    <img :src="app.image" :alt="app.name" class="app-image" />
    <p>{{ app.description }}</p>
    <p><strong>Version:</strong> {{ app.version }}</p>
    <p><strong>Size:</strong> {{ app.size }}</p>
    <p><strong>Last Updated:</strong> {{ app.updatedAt }}</p>
    <a :href="app.downloadLink" class="download-button">Download</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      app: {},
    }
  },
  async created() {
    const appId = this.$route.params.id
    const response = await fetch('/data/apps.json')
    const apps = await response.json()
    this.app = apps.find((app) => app.id === parseInt(appId))
  },
  methods: {
    downloadApp() {
      alert(`Downloading ${this.app.name}...`)
      // 模拟记录下载次数
      console.log(`Download count for ${this.app.name} increased.`)
    },
  },
}
</script>

<style scoped>
.app-detail {
  padding: 20px;
  text-align: center;
}

.app-image {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.download-button {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.download-button:hover {
  background-color: #369f6e;
}
</style>