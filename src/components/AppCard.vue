<template>
  <div class="app-card" @click="goToDetail">
    <img :src="app.image" :alt="app.name" class="app-image" />
    <h2>{{ app.name }}</h2>
    <p v-if="version">版本: {{ version }}</p>
    <p v-if="size">大小: {{ size }}</p>
    <p v-if="updatedAt">更新: {{ updatedAt }}</p>
    <a @click="showTips" v-if="downloadLink && !app.isDisable" :href="downloadLink" class="download-button">下载</a>
    <button v-if="downloadLink && !app.isDisable" @click.stop="copyLink" class="copy-button">复制链接</button>
  </div>
</template>

<script>
import {load} from 'js-yaml'
import {getActoken} from '../utils/index'
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
    showTips(){
      this.$emit('showtip')
    },
    async initRepoInfo(){
      const token = await getActoken()
      const res = await fetch(`https://gitee.com/api/v5/repos/isfy/${this.app.v_repo}/releases/latest?access_token=${token}&ref=master`)
      .then(res=>res.json())
      if(!res.tag_name) return
      this.version = res.tag_name
      const body = JSON.parse(res.body)
      this.downloadLink = body.url
      this.size = body.size || ''
      this.updatedAt = new Date(res.created_at).toLocaleString()
    },
    async initData(){
      if(this.app.v_repo) return this.initRepoInfo()
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
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.downloadLink)
        alert('链接已复制到剪贴板')
      } catch (err) {
        alert('复制失败，请手动复制链接: ' + this.downloadLink)
      }
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

.copy-button {
  display: inline-block;
  margin: 16px 0 0 8px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.copy-button:hover {
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
