<template>
<div id="app">

  <div class="row max"
    v-if="Object.keys(config).length === 0">
    <h1>Questionary</h1>
    <label>Previous</label>
    <textarea v-model="oldJson" rows=5
      placeholder="Enter a questionary config JSON"
    ></textarea><br>
    <button @click="loadConfig">Load</button><br><br>
    <button
      @click="config = Questionary()">
      New</button>
  </div>

  <div v-else>

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
          v-for="lang in langs" :key="lang"
          @click="removeLang(lang)"
          >{{lang}}</div>
      </div>
      <input class="gluedRigth tinyInput" placeholder="Language" maxlength=2
        :class="{langError: langError}"
        @keyup.enter="addLangage" v-model="newLang">
      <button @click="addLangage" class="gluedLeft">Add</button>
    </div>
    <div class="row">
      <h1>Questions</h1>
      <Questions
        v-if="langs[0]"
        :questions="config.questions"
        :langs="langs"/>
      <p v-else>Add a language to edit questions</p>
    </div>
  </div>

  <div class="row max" v-if="Object.keys(config).length > 0">
    <button @click="save">GET JSON</button>
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
    defaultLangs : ['fr','en','es','ba','de'],
    langs: [],
    config: {},
    newLang: '',
    langError: false,
  }},
  computed:{
    lang0: function(){
      if(this.langs)
        return this.langs[0]
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
      this.langs = this.defaultLangs
      var vm = this
      return {
        name : '',
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
      this.langs.splice(this.langs.indexOf(lang), 1)
      delete this.config.questions[lang]
    },
    addLangage: function(){
      this.newLang = this.newLang.toLowerCase()
      if(this.newLang.length < 2 || ~this.langs.indexOf(this.newLang)){
        var vm = this
        setTimeout(function(){
          vm.langError = false
        }, 2000)
        return this.langError = true
      }
      this.langs.push(this.newLang)
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
      console.log('Vue model',this)
      console.log('config', this.config)
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
::-webkit-scrollbar {
  display: none;
}
#app{
  padding: 20px 0;
  text-align: center;
  width: 720px;
  margin: auto;
  overflow: auto;
}
label {
  display: block;
  padding-left: 10px;
  text-align: left;
}
input, textarea{
  resize: vertical;
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
pre{
  text-align: left;
}
button{
  max-width: 125px;
  font-size: 15px;
  border: 1px solid #56585c;
  color: #f0f1f5;
  background-color: #56585c;
  cursor: pointer;
  padding: 5px 10px;
  transition-duration: 0.2s;
  font-weight: bold;
}
button:hover{
  background-color: #f0f1f5;
  color: #0b0c0c;
  border: 1px solid #0b0c0c;
}
h1{
  cursor: pointer;
  background-color: #56585c;
  color: #f0f1f5;
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
  font-family: 'Consolas';
  margin: 0 5px;
  font-size: 20px;
  padding: 2px 7px;
  cursor: pointer;
}
.lang:hover{ background-color: #db3254 }
.lang:hover:before{
  content: '-';
  font-weight: bold;
  display: inline-block;
  animation: expandX 0.2s;
}
@keyframes expandX {
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
  margin-left: 0;
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
.hidden{display: none;}
.langError{
  border: 1px solid #db3254;
}
.row > p{
  margin-top: 10px;
}
</style>