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
        <div>
          <button @click='config = {}'>Return to title</button>
        </div>
      </div>
    </div>
    <div class="row">
      <h1>Languages</h1>
      <div class="content langs">
        <div class="lang"
          v-for="lang in langs" :key="lang"
          @click="removeLang(lang)"
          :class="[ lang === langs[0] ? 'blue' : '' ]"
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
        @update-id="lastQuestionId++"
        :questions="config.questions"
        :langs="langs"
        :config="config"/>
      <p v-else>Add a language to edit questions</p>
    </div>
  </div>

  <div class="row max" v-if="Object.keys(config).length > 0">
    <button @click="save">GET JSON</button>
  </div>

  <textarea class="pre" style="text-align:left;font-family:monospace"
    readonly="readonly"
    v-if="json.length > 0" v-model="json"
    ></textarea>

</div>
</template>

<script>
import Questions from './components/questions'
export default {
  name: 'App',
  components:{ Questions },
  data: function(){ return {
    json: '',
    oldJson: '',
    defaultLangs : ['fr','en','nl'],
    langs: [],
    config: {},
    newLang: '',
    langError: false,
    lastQuestionId: 0,
    needDisaplay: false,
  }},
  computed:{
    lang0: function(){
      if(this.langs)
        return this.langs[0]
      return null
    },
  },
  methods:{
    loadConfig: function(){
      try{
        var holder = JSON.parse(this.oldJson)
        this.langs = Object.keys(holder.questions)
        this.config = holder
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
        id : 'q' + vm.lastQuestionId,
        question : '', next : '',
        max : 1, min : 1,
        col : 2, row : 1,
        options : [vm.Answer(), vm.Answer()],
      }
    },
    Answer: function(){ return { text: '', src: '', tags: [], next: '' } },
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
        vm.config.questions[lang][i].id = vm.config.questions[vm.lang0][i].id
      })
    },
    save: function(){
      this.json = JSON.stringify(this.config, null, 2)
      var vm = this
      setTimeout(function(){
        var el = document.getElementsByClassName('pre')[0]
        el.style.cssText = 'height:' + (el.scrollHeight + 50) + 'px';
        el.select()
        el.setSelectionRange(0, 99999)
        document.execCommand("copy")
        vm.json = 'Copied to clipboard!\n\n' + vm.json
      }, 0)
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
  width: 600px;
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
  width: 80.5%;
  margin: auto;
  font-size: 25px;
  padding: 5px 0;
}
.labelInput{
  width: min-content;
  margin: 0 auto;
  text-align: left;
}
.labelInput > div{
  text-align: center;
  margin-top: 10px;
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
.blue{
  background-color: #2266EE;
}
.hidden{display: none;}
.transparent{
  opacity: 0;
  visibility: hidden;
}
.langError{
  border: 1px solid #db3254;
}
.row > p{
  margin-top: 10px;
}
.pre {
  background-color: ghostwhite;
  border: 1px solid silver;
  padding: 10px 20px;
  margin: 20px;
  display: block;
  box-sizing:border-box;
  width: 550px;
  margin: auto;
  display:block;
  font-family: monospace;
}

</style>