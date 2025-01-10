<template>
  <div class="app-card" @click="goToDetail">
    <img :src="app.image" :alt="app.name" class="app-image" />
    <h2>{{ app.name }}</h2>
    <p>{{ app.description }}</p>
    <a :href="app.downloadLink" class="download-button" @click.stop>下载</a>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetail() {
      // this.$router.push(`/app/${this.app.id}`)
    },
  },
}
</script>

<style scoped>
.app-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin: 8px;
  box-sizing: border-box;
}

.app-image {
  width: 100%;
  max-width: 150px;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 8px;
}

.download-button {
  display: inline-block;
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.download-button:hover {
  background-color: #369f6e;
}

@media (max-width: 768px) {
  .app-card {
    padding: 12px;
    margin: 6px;
  }
  
  .app-image {
    max-width: 120px;
  }
  
  .download-button {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .app-card {
    padding: 8px;
    margin: 4px;
  }
  
  .app-image {
    max-width: 100px;
  }
  
  .download-button {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
