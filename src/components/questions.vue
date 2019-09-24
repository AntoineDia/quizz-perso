<template>
  <div>
    <div class="views">
      <label>View</label>
      <button
        v-for="view in views" :key="view"
        @click="changeView"
        :class="{ 'active' : view === currentView }"
      >{{view}}</button>
    </div>

    <div
      v-for="(question, qId) in config.questions[lang0]" :key="question.id"
    >
      <QuestionComp
        :currentView="currentView"
        :question="getQuestionInAllLangs(qId)"
        :lang0="lang0"
        :config="config"
      ></QuestionComp>
    </div>

    <div class="newQuestion">
      <button @click="newQuestion">New Question</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Question } from '../Objects'
import QuestionComp from './question'
export default {
  name: 'Questions',
  props: ['config'],
  data(){
    return {
      currentView: 'Unified',
      views: ['Unified','Translation','Detail'],
      lang0: 'fr',
    }
  },
  components: { QuestionComp },
  methods:{
    changeView(ev){
      this.currentView = ev.target.innerText
    },
    getQuestionInAllLangs(qId){
      let q = {}
      this.config.langs.forEach(lang =>{
        if(!this.config.questions[lang]){
          Vue.set(this.config.questions, lang, [new Question])
        }
        q[lang] = this.config.questions[lang][qId]
      })
      return q
    },
    newQuestion(){
      this.config.langs.forEach(lang => {
        Vue.set(this.config.questions[lang], this.config.questions[lang].length, new Question)
      })
    }
  }
}
</script>

<style scoped>
.hidden{
  display: none;
}
.views{
  margin: 15px auto;
  text-align: center;
}
.newQuestion > button{
  margin: 5px;
  padding: 15px;
  width: 300px;
}
.newQuestion > button:hover, .newQuestion > button:active{
  background-color: #ccc;
}
.views > button{
  margin: 5px;
  padding: 10px;
}
.views > button:hover, .active{
  background-color: #ccc;
}
.newQuestion{
  text-align: center;
}
</style>