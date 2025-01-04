<template>
  <div class="app-card" @click="goToDetail">
    <img :src="app.image" :alt="app.name" class="app-image" />
    <h2>{{ app.name }}</h2>
    <p>{{ app.description }}</p>
    <a :href="app.downloadLink" class="download-button" @click.stop>Download</a>
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
      this.$router.push(`/app/${this.app.id}`)
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
  max-width: 300px;
  margin: 16px;
}

.app-image {
  max-width: 100%;
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
}

.download-button:hover {
  background-color: #369f6e;
}
</style>