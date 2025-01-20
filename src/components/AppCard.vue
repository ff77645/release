<template>
  <div class="app-card" @click="goToDetail">
    <img :src="app.image" :alt="app.name" class="app-image" />
    <h2>{{ app.name }}v{{ version }}</h2>
    <p v-if="downloadLink">更新: {{ updatedAt }}</p>
    <p v-if="downloadLink">大小: {{ size }}</p>
    <a v-if="downloadLink && !app.isDisable" :href="downloadLink" class="download-button">下载</a>
  </div>
</template>

<script>
import {load} from 'js-yaml'
const proxy = 'https://proxy2.tooto.live/proxy?url='

export default {
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      updatedAt:'',
      version:'',
      size:'',
      downloadLink:''
    }
  },
  mounted(){
    this.initData()
  },
  methods: {
    async initData(){
      if(!this.app.downloadLink) return
      const res = await fetch(proxy + this.app.downloadLink + '/latest.yml?t=' + Date.now()).then(res=>res.text())
      if(!res) return
      const obj = load(res)
      console.log(this.app.name,{obj});
      const file = obj.files[0]
      this.size = (file.size / 1024 / 1024).toFixed(2) + 'MB'
      this.version = obj.version
      this.downloadLink = this.app.downloadLink + '/' + obj.path
      this.updatedAt = new Date(obj.releaseDate).toLocaleString()
    },
    goToDetail() {
      // this.$router.push(`/app/${this.app.id}`)
    },
    onDownload(){}
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
  transition: all 0.2s ease;
  cursor: pointer;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #42b983;
}

.app-card:active {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
