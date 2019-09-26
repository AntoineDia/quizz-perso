<template>
<div id="app">

  <div class="row max"
    v-if="Object.keys(config).length === 0">
    <h1>Questionary</h1>
    <button
      @click="config = Questionary()">
      New</button>

    <label>Previous</label>
    <textarea v-model="oldJson" rows=5
      placeholder="Enter a questionary config JSON"
    ></textarea>
    <button @click="loadConfig">Load</button>
  </div>

  <div v-else>

    <font-awesome-icon icon="language" class="big"/>

    <div class="row">
      <h1>Main</h1>
      <div class="labelInput content">
        <label>Name</label>
        <input v-model="config.name" placeholder="Name of the questionary">
      </div>
    </div>
    <div class="row">
      <h1>Languages</h1>
      <div class="content langs">
        <div class="lang"
          v-for="lang in config.langs" :key="lang"
          @click="removeLang(lang)"
          >{{lang}}</div>
      </div>
      <input class="gluedRigth tinyInput" placeholder="Language" maxlength=2
        @keyup.enter="addLangage" v-model="newLang">
      <button @click="addLangage" class="gluedLeft">Add</button>
    </div>
    <div class="row">
      <h1>Questions</h1>
      <Questions
        :questions="config.questions"/>
    </div>
  </div>

  <div class="row max" v-if="Object.keys(config).length > 0">
    <button @click="save">Get JSON</button>
  </div>

</div>
</template>

<script>
import Questions from './components/q'
export default {
  name: 'App',
  components:{ Questions },
  data: function(){ return {
    oldJson: '',
    defaultLangs : ['fr','en'],
    config: {},
    newLang: '',
  }},
  computed:{
    lang0: function(){
      if(this.config.langs)
        return this.config.langs[0]
      return null
    },
    currentQuestionId(){
      if(this.config.questions)
        return this.config.questions[this.lang0].length
      return 0
    },
  },
  methods:{
    loadConfig: function(){
      try{
        this.config = JSON.parse(this.old)
      }catch(e){
        alert('JSON Incorect')
      }
    },
    Questionary: function(){
      var vm = this
      return {
        name : '',
        langs: vm.defaultLangs,
        questions: vm.defaultLangs.reduce(function(acc, lang){
          acc[lang] = [vm.Question()]; return acc
        }, {})
      }
    },
    Question: function(){
      var vm = this
      return {
        id : 'q' + vm.currentQuestionId,
        question : '', next : '',
        max : 1, min : 1,
        col : 2, row : 1,
        options : [vm.Answer(), vm.Answer()],
      }
    },
    Answer: function(){ return { src: '', tags: [], next: '' } },
    removeLang(lang){
      this.config.langs.splice(this.config.langs.indexOf(lang), 1)
      delete this.config.questions[lang]
    },
    addLangage: function(){
      if(this.newLang.length < 2 || ~this.config.langs.indexOf(this.newLang))
        return
      this.config.langs.push(this.newLang)
      this.$set(this.config.questions, this.newLang, [])
      this.fillQuestions(this.newLang)
      this.newLang = ''
    },
    fillQuestions: function(lang){
      var vm = this
      this.config.questions[this.lang0].forEach(function(question, i){
        vm.$set(vm.config.questions[lang], i, vm.Question())
        vm.config.questions[lang][i].id = 'q' + i
      })
    },
    save: function(){
      console.log(this, 'config', this.config)
      // console.log(JSON.stringify(this.config))
    }
  },
}
</script>

<style>
:root{
  --expand: 'https://img.icons8.com/metro/50/0B0C0C/resize-diagonal.png';
  --compress: 'https://img.icons8.com/metro/50/0B0C0C/compress.png';
  --trash: 'https://img.icons8.com/metro/50/0B0C0C/trash.png';
  --translation: 'https://img.icons8.com/metro/50/2266EE/translation.png';
}
*{
  margin: 0; padding: 0; outline: 0;
  font-family: sans-serif;
  color: #0b0c0c;
  background-color: #f0f1f5;
  border-style: none;
  border-radius: 2px;
}
#app{
  text-align: center;
  width: 720px;
  position: absolute;
  top: 50%; left:50%;
  transform: translate(-50%,-50%)
}
label {
  display: block;
  padding-left: 10px;
}
input, textarea{
  border-radius: 2px;
  border: 1px solid #56585c;
  padding: 5px 10px;
  font-size: 15px;
  background-color: #f5fbfa; /*clearer*/
  max-width: 100%;
  transition-duration: 0.2s;
}
input:hover, input:focus,
textarea:hover, textarea:active{
  border: 1px solid #0b0c0c;
}
button{
  font-size: 15px;
  border: 1px solid #56585c;
  color: #f0f1f5;
  background-color: #56585c;
  cursor: pointer;
  padding: 5px 10px;
  transition-duration: 0.2s;
}
button:hover{
  background-color: #f0f1f5;
  color: #0b0c0c;
}
h1{
  cursor: pointer;
  background-color: #4b4d4e;
  color: #f5fbfa;
  width: 80%;
  margin: auto;
  font-size: 25px;
  padding: 5px 0;
}
.labelInput{
  width: min-content;
  margin: 0 auto;
  text-align: left;
}
.row{
  margin-bottom: 15px;
  padding: 0 10px;
}
.content{
  margin-top: 15px;
}
.lang{
  display: inline-block;
  background-color: #56585c;
  color: #f0f1f5;
  border-radius: 2px;
  text-transform: uppercase;
  font-family: monospace;
  margin: 0 5px;
  font-size: 20px;
  padding: 2px 7px;
  cursor: pointer;
}
.lang:hover{ background-color: #db3254 }
.lang:hover:after{
  content: '-';
  font-weight: bold;
  display: inline-block;
  animation: contentMinus 0.2s;
}
@keyframes contentMinus {
  0% { width: 0; transform: scale(0,1) }
  100%{ width: 11px; transform: scale(1,1) }
}
.langs{
  margin-bottom: 10px;
}
.gluedRigth{
  border-radius: 2px 0 0 2px;
}
.gluedLeft{
  border-radius: 0 2px 2px 0;
}
.tinyInput{
  width: 70px;
}
.max > *{
  width: 600px;
  box-sizing : border-box;
  margin: auto;
}
.max label{
  text-align: left;
  margin-top: 15px;
}
.max h1{
  margin-bottom: 10px;
}
.big{
  font-size: 50px;
  color: #2266EE;
}
</style>