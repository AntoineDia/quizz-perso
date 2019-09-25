<template>
  <div>
    <div class="views">
      <label>View</label>
      <button
        v-for="view in views" :key="view"
        @click="changeView"
        :class="{ 'active' : view === currentView }"
      >{{view}}</button>
      <label v-if="currentView === 'Flow'"><b>{{lang0.toUpperCase()}}</b></label>
    </div>

    <div
      class="container"
      v-for="(question, qId) in config.questions[lang0]" :key="question.id"
    >
      <button class="remove" @click="removeQuestion(qId)">Remove</button>
      <QuestionComp
        :currentView="currentView"
        :question="getQuestionInAllLangs(qId)"
        :lang0="lang0"
        :config="config"
        :i="qId+1"
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
      currentView: 'Flow',
      views: ['Flow','Translation','Detail'],
      lang0: this.config.langs[0],
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
        const id = 'q' + Date.now()
        Vue.set(this.config.questions[lang], this.config.questions[lang].length, new Question)
        this.config.questions[lang][this.config.questions[lang].length-1].id = id
      })
    },
    removeQuestion(idInArray){
      this.config.langs.forEach(lang => {
        this.config.questions[lang].splice(idInArray,1)
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
.container{
  width: min-content;
  margin: auto;
  position: relative;
}
.remove{
  height: calc(100% - 19px);
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateX(150%);
}
.remove:hover{
  background-color: #ccc;
}
</style>