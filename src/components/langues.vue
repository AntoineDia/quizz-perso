<template>
  <div class='tab'>
    <div
      class="selectedLang"
      v-for="lang in config.langs"
      :key="lang"
      @click="removeLang(lang)"
    >{{lang}}</div>
    <div class="newLang">
      <input
        maxlength="2"
        type="text"
        placeholder="Lang"
        v-on:keyup.enter="newLangage"
        v-model="newLang"
      >
      <button @click="newLangage">Add</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Question } from '../Objects'
export default {
  name: 'Langues',
  props: ['config'],
  data(){
    return{
      newLang: ''
    }
  },
  methods:{
    newLangage(){
      if(this.newLang.length !== 2 || this.config.langs.includes(this.newLang))
        return document.querySelector('.newLang input').className = 'error'
      document.querySelector('.newLang input').className = ''

      let lang0 = this.config.langs[0]
      if(!lang0) lang0 = this.newLang

      Vue.set(this.config.questions, this.newLang, [])

      this.config.questions[lang0].forEach((question,i) => {
        Vue.set(this.config.questions[this.newLang], i, new Question())
        this.config.questions[this.newLang][i].id = this.config.questions[lang0][i].id
      });

      this.config.langs.push(this.newLang)
      this.newLang = ''
    },
    removeLang(lang){
      this.config.langs.splice(this.config.langs.indexOf(lang),1)
      delete this.config.questions[lang]
    }
  },
}
</script>

<style scoped>

.selectedLang{
  background-color: #ccc;
  padding: 8px;
  margin: 0 4px;
  white-space: none;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
  margin-bottom: 2px;
  display: inline-block;
}
.selectedLang:hover{
  background-color: #db3254;
  color: white;
}
.selectedLang:hover:before{
  content: '- ';
  font-weight: bold;
  position: relative;
}
.newLang{
  margin: 15px auto;
}
.newLang > *{
  display: inline;
}
.error{
  border: 1px solid #db3254;
}
input{
  width: 50px;
}
button{
  cursor: pointer;
  padding: 10px 15px;
  background-color: #ccc;
  border-style: none;
  border: 1px solid #ccc;
}
button:active, button:hover{
  background-color: #eee;
  border: 1px solid #ccc;
}

</style>