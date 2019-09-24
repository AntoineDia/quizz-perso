<template>
  <div class='tab'>
    <span
      class="selectedLang"
      v-for="lang in config.langs"
      :key="lang"
    >{{lang}}</span>
    <div class="newLang">
      <input
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
      if(this.newLang.length !== 2) {
        document.querySelector('.newLang > input').className = 'error'
        return
      }
      document.querySelector('.newLang > input').className = ''

      let lang0 = this.config.langs[0]
      Vue.set(this.config.questions, this.newLang, [])
      this.config.questions[lang0].forEach((question,i) => {
        Vue.set(this.config.questions[this.newLang], i, new Question())
      });
      this.config.langs.push(this.newLang)
      this.newLang = ''
    },
  },
}
</script>

<style scoped>

.selectedLang{
  background-color: #ccc;
  padding: 5px;
  margin: 0 4px;
  white-space: none;
  text-transform: uppercase;
}
.newLang{
  margin: 15px auto;
}
.newLang > *{
  display: inline;
}
.error{
  border: 1px solid red;
}
input{
  width: 55px;
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