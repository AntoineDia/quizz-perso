<template>
<div>
  <div id="questions"
    v-for="(questionsByID, qId) in questionsInAllLangs" :key="questionsByID[qId]"
  >
    <div class="inline">
      <label><b>Question {{qId+1}}</b></label>
      <div class="tileLang" style="visibility:hidden">hh</div>
    </div>
    <div class="questionRow">
      <div class="questionsInputs">
        <div class="questionTitle"
        v-for="(question, lang) in questionsByID" :key="lang"
        :class="[ !translationMode && lang !== langs[0] ? 'height0' : '' ]"
        >
          <div class="tileLang gluedRigth"
            :class="[lang === langs[0] ? 'blue' : '']"
            @click="$event.target.nextElementSibling.focus()"
          >{{lang}}</div>
          <input type="text" class="inputQuestion gluedLeft"
            v-model="question.question" placeholder="What to ask?">
        </div>
      </div>
      <div class="editAll" @click="editionMode = !editionMode"></div>
      <div>
        <div class="buttonsHolder" v-for="(question, lang) in questionsByID" :key="lang"
          :class="[ !translationMode && lang !== langs[0] ? 'height0' : '' ]">
          <button class="edit delete" :class="visibilityButton(lang)"
            @click="removeQuestion(question.id)"></button>
          <button class="edit translation"
            @click="translationMode = !translationMode"
            :class="[visibilityButton(lang), translationMode ? 'active' :'' ]"></button>
        </div>
      </div>
    </div>
    <div class="questionParams">
      <div class="inline params" v-for="(question, lang, i) in questionsByID" :key="i"
        :class="[lang === langs[0] ? '' : 'hidden', editionMode ? '': 'height0']"
      >
        <div class="tileLang" style="visibility:hidden">hh</div>
        <div>
          <label>Answers redirect</label>
          <input type="text" placeholder="Next question">
          <label>Answer layout</label>
          <div class="dual">
            <span class="leftLabel">Cols</span>
            <input type="number" min="1" v-model="question.col">
            <span class="leftLabel">Rows</span>
            <input type="number" min="1" v-model="question.row">
          </div>
          <label>Number of choices</label>
          <div class="dual">
            <span class="leftLabel">Max</span>
            <input type="number" min="1" v-model="question.max">
            <span class="leftLabel">Min</span>
            <input type="number" min="1" v-model="question.min">
          </div>
        </div>
      </div>
    </div>
    <div class="answerRow">
      <span class="optionsHead">Options</span>
      <button class="optionEdit" @click="answerEdition = !answerEdition" :class="answerEdition ? 'active' : ''"></button>
      <div :class="!answerEdition ? 'height0' : ''">
        <div v-for="(answers, lang) in optionByQuestion(qId)" :key="lang"
          :class="!translationMode && lang !== langs[0] ? 'height0' : ''">
          <div v-for="(answer, i) in answers" :key="i">
            {{lang}} option {{i+1}}{{answer}}
          </div>
        </div>
      </div>
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
    answerEdition: false,
    editionMode: false,
    currentQ: {
      id: null, lang: null
    }
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
      this.$emit('update-id')
      var vm = this
      this.langs.forEach(function(lang){
        vm.questions[lang].push(vm.$parent.Question())
      }, {})
    },
    removeQuestion: function(id){
      var idArray = this.questions[this.langs[0]].findIndex(function(q){
        return q.id === id
      })
      this.langs.forEach(function(lang){
        this.questions[lang].splice(idArray,1)
      }.bind(this))
    },
    visibilityButton: function(lang){
      return this.translationMode && lang !== this.langs[0] ? 'transparent' : ''
    },
    optionByQuestion: function(id){
      var questionsInId = this.questionsInAllLangs[id]
      var obj = {}
      Object.keys(questionsInId).forEach(function(lang,i){
        obj[lang] = questionsInId[lang].options
      })
      return obj
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  height: 28px;
  transition-property: 'transform','opacity', 'height';
}
.questionTitle:nth-child(even):not(.height0){
  margin-top: 5px;
}
.questionTitle:nth-child(even):not(.height0):not(:last-child){
  margin-bottom: 5px;
}
.flex{
  display: flex;
}
.buttonsHolder{
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  height: 28px;
}
.buttonsHolder > button:nth-child(even){
  margin-left: 5px;
}
.buttonsHolder > button:nth-child(even):not(:last-child){
  margin-right: 5px;
}
@keyframes expandX {
  0% { width: 0; transform: scale(0,1) }
}
.questionRow{
  display: flex;
  flex-direction: row;
}
.questionRow > * {
  margin: 5px auto;
}
.edit{
  width: 35px; height: 28px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid transparent;
  display: inline-block;
  box-sizing : border-box;
}
.questionParams input{
  width: 296px;
}
.inputQuestion{
  width: 350px;
}
.gluedAll{
  border-radius: 0px;
}
.expand{
  border: 1px solid #56585c;
  background-color: #56585c;
  background-image: url('https://img.icons8.com/metro/50/f0f1f5/edit.png');
}
.expand:hover{
  border: 1px solid #0b0c0c;
  background-image: url('https://img.icons8.com/metro/50/0B0C0C/edit.png');
}
.translation{
  border: 1px solid #2266EE;
  background-size: 22px;
  background-color: transparent;
  background-image: url('https://img.icons8.com/metro/22/2266EE/translation.png')
}
.translation:hover, .translation.active{
  background-color: #2266EE;
  border: 1px solid #2266EE;
  background-image: url('https://img.icons8.com/metro/22/f0f1f5/translation.png')
}

.collapse{ background-image: url('https://img.icons8.com/metro/50/0B0C0C/compress.png')}
.delete{
  border: 1px solid #db3254;
  background-size: 22px;
  background-image: url('https://img.icons8.com/metro/22/db3254/trash.png');
}
.delete:hover{
  background-color: #db3254;
  border: 1px solid #db3254;
  background-image: url('https://img.icons8.com/metro/22/f0f1f5/trash.png');
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
  user-select: none;
}
.inline > *{
  display: inline-block;
  padding-bottom: 0;
}
.height0 button{
  visibility: hidden;
}
.height0 *::placeholder {
  color: transparent;
}
.height0{
  transform: scaleY(0);
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}
.add{
  margin-top: 15px;
}
.editAll{
  background-color: #56585c;
  border: 1px solid #56585c;
  width: 35px;
  margin-left: 5px;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url('https://img.icons8.com/metro/24/f0f1f5/edit.png');
  background-size: 24px;
  cursor: pointer;
  transition-duration: 0.2s;
}
.editAll:hover{
  border: 1px solid #0b0c0c;
  background-color: transparent;
  background-image: url('https://img.icons8.com/metro/24/0B0C0C/edit.png');
}
.questionParams label:first-child{
  margin-top: 5px;
}
.questionParams label:not(:first-child){
  margin-top: 10px;
}
.leftLabel:not(:first-child){
  margin-left: 10px;
}
.leftLabel{
  width: 60px;
  padding: 5px 0;
  text-align: center;
  background-color: #56585c;
  border: 1px solid #56585c;
  color: #f0f1f5;
  border-radius: 2px 0 0 2px;
}
.dual{
  display: flex;
}
.dual input{
  width: 70px;
  border-radius: 0 2px 2px 0;
}
.params{
  transition-duration: 0.2s;
}
.params:not(.height0){
  margin-bottom: 10px;
}
.optionsHead{
  font-weight: bold;
  padding-bottom: 4.5px;
  padding-top: 4.5px;
  padding-left: 10px;
  display: inline-block;
  background-color: #56585c;
  border: 1px solid #56585c;
  color: #f0f1f5;
  width: 350px;
}
.answerParams > *{
  display: inline-block;
}
.answerParams input{
  width: 298px;
}
.answerRow .tileLang{
  display: inline-block;
}
.answerRow{
  text-align: left;
}
.answer{
  transition-duration: 0.2s;
}
.optionEdit, .optionEdit.active:hover{
  position: relative;
  top: 4px;
  width: 35px;
  margin-left: 5px;
  border: 1px solid #56585c;
  background-color: #56585c;
  background-image: url('https://img.icons8.com/metro/24/f0f1f5/edit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 30px;
  background-size: 24px;
}
.optionEdit:hover, .optionEdit.active{
  border: 1px solid #0b0c0c;
  background-color: transparent;
  background-image: url('https://img.icons8.com/metro/24/0b0c0c/edit.png');
}
.optionHead{
  font-weight: bold;
  border-radius: 0;
  margin-top: 15px;
  margin-bottom: 10px;
  padding-left: 5px;
}

</style>