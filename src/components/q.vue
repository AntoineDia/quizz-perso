<template>
<div>
  <div id="questions"
    v-for="(questionsByID, qId) in questionsInAllLangs" :key="questionsByID[qId]"
  >
  <div class="inline">
    <div class="tileLang" style="visibility:hidden">hh</div>
    <label>Question {{qId+1}}</label>
  </div>
    <div class="questionTitle"
      v-for="(question, lang) in questionsByID" :key="lang"
      :class="[ !translationMode && lang !== langs[0] ? 'height0' : '' ]"
    >
      <div class="tileLang gluedRigth"
        :class="translationMode ? 'intoAnimation' : ''"
        @click="$event.target.nextElementSibling.focus()"
      >{{lang}}</div>
      <input type="text" class="inputQuestion gluedAll"
        v-model="question.question"
        placeholder="What to ask?">
      <button class="edit expand gluedLeft"></button>
      <button class="edit translation gluedRigth"
        @click="translationMode = !translationMode"></button>
      <button class="edit delete gluedLeft"></button>
    </div>
  </div>
  <div><button class="add" @click="addQuestion">Add question</button></div>
</div>
</template>

<script>
export default {
  name: 'Questions',
  data: function(){ return {
    translationMode: false,
  }},
  props: ['questions','langs'],
  computed: {
    questionsInAllLangs: function(){
      var vm = this
      return this.questions[this.langs[0]].map(function(question,i){
        return vm.langs.reduce(function(acc, lang){
          acc[lang] = vm.questions[lang][i]
          return acc
        }, {})
      })
    }
  },
  methods:{
    addQuestion: function(){
      var vm = this
      this.langs.forEach(function(lang){
        vm.questions[lang].push(vm.$parent.Question())
      }, {})
    }
  }
}
</script>
<style>
#questions{
  width: max-content;
  margin: auto;
}
#questions label{
  width: max-content;
}
.inline{
  text-align: left;
}

.questionTitle{
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  height: 28px;
  transition-property: 'transform','opacity', 'height';
}
@keyframes expandX {
  0% { width: 0; transform: scale(0,1) }
}
.edit{
  width: 45px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid transparent;
  background-size: contain;
  display: inline-block;
  box-sizing : border-box;
}
.inputQuestion{
  width: 300px;
}
.gluedAll{
  border-radius: 0px;
}
.expand{
  border: 1px solid #56585c;
  background-color: #56585c;
  background-image: url('https://img.icons8.com/metro/50/f0f1f5/resize-diagonal.png');
}
.expand:hover{
  border: 1px solid #0b0c0c;
  background-image: url('https://img.icons8.com/metro/50/0B0C0C/resize-diagonal.png');
}
.translation{
  width: 35px;
  margin-left: 10px;
  border: 1px solid #2266EE;
  background-size: 22px;
  background-image: url('https://img.icons8.com/metro/22/2266EE/translation.png')
}
.translation:hover{
  background-color: #2266EE;
  border: 1px solid #2266EE;
  background-image: url('https://img.icons8.com/metro/22/f0f1f5/translation.png')
}
.collapse{ background-image: url('https://img.icons8.com/metro/24/0B0C0C/compress.png')}
.delete{
  width: 35px;
  border: 1px solid #db3254;
  background-size: 20px;
  background-image: url('https://img.icons8.com/metro/20/db3254/trash.png');
}
.delete:hover{
  background-color: #db3254;
  border: 1px solid #db3254;
  background-image: url('https://img.icons8.com/metro/20/f0f1f5/trash.png');
}
.tileLang{
  background-color: #56585c;
  color: #f0f1f5;
  border-radius: 2px;
  text-transform: uppercase;
  font-family: 'Consolas';
  font-size: 20px;
  padding: 2px 7px;
  cursor: pointer;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;

}
.inline > *{
  display: inline-block;
  padding-bottom: 0;
}
.height0 *::placeholder {
  color: transparent;
}
.height0{
  /* padding: 0; */
  transform: scaleY(0);
  height: 0;
  opacity: 0;
  margin: 0;
}
.add{
  margin-top: 5px;
}
</style>