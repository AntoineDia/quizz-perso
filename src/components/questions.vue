<template>
<div>
  <div id="questions"
    v-for="(questionsByID, qId) in questionsInAllLangs" :key="questionsByID[qId]"
  >
    <div class="inline questionHead">
      <label><b>Question {{qId+1}}</b></label>
    </div>
    <div class="questionRow">
      <div class="questionsInputs">
        <div class="questionTitle"
          v-for="(question, lang) in questionsByID" :key="lang"
          :class="[ !translationMode && lang !== langs[0] ? 'height0' : '' ]">
          <div class="tileLang gluedRigth"
            :class="[lang === langs[0] ? 'blue' : '']"
            @click="$event.target.nextElementSibling.focus()"
          >{{lang}}</div>
          <input type="text" class="inputQuestion gluedLeft"
            v-model="question.question" placeholder="What to ask?">
        </div>
      </div>
      <div class="editAll" @click="editionMode === qId ? editionMode = -1 : editionMode = qId"></div>
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
        :class="[lang === langs[0] ? '' : 'hidden', editionMode === qId ? '': 'height0']">
        <div>
          <label>Answers redirect</label>
          <Redirect
            :qId="question.id"
            :qIdInArray="i"
            :holder="question"
            :lang="lang"
            :config="config"
          />
          <label>Answer layout</label>
          <div class="dual">
            <span class="leftLabel">Cols</span>
            <input type="number" min="1" v-model.number="question.col"
              @input="updateProp('question','col',qId)">
            <span class="leftLabel">Rows</span>
            <input type="number" min="1" v-model.number="question.row"
              @input="updateProp('question','row',qId)">
          </div>
          <label>Number of choices</label>
          <div class="dual">
            <span class="leftLabel">Max</span>
            <input type="number" min="1" v-model.number="question.max"
              @input="updateProp('question','max',qId)">
            <span class="leftLabel">Min</span>
            <input type="number" min="1" v-model.number="question.min"
              @input="updateProp('question','min',qId)">
          </div>
        </div>
      </div>
    </div>
    <div class="answerRow">
      <span class="optionsHead">Options</span>
      <button class="optionEdit"
        @click="answerEdition === qId ? answerEdition = -1 : answerEdition = qId"></button>
      <div>
        <div v-for="(options, optId) in optionByQuestion(qId)" :key="optId"
           :class="answerEdition !== qId ? 'height0' : ''" class="optionsRows">
          <div class="optionsTitle">Option {{parseInt(optId) + 1}}</div>
          <button class="edit delete optionDelete"
            @click="removeOption(qId,optId)"></button>
          <div class="optionsHolder"
            v-for="(option, lang) in options" :key="lang + optId">
            <div v-if="lang === langs[0]">
              <label>Illustration source</label>
              <input type="text" v-model="option.src"
                placeholder="example: https://picsum.photos/200/300"
                @input="updateProp(qId,'src', optId)">
            </div>
            <div v-if="lang === langs[0]">
              <label>Tags</label>
              <input type="text" placeholder="Separate each by a comma"
                @input="[parseTags(option,$event.target.value), updateProp(qId,'tags', optId)]"
                :value="option.tags.join(', ')">
            </div>
            <div v-if="lang === langs[0]">
              <label>Answers redirect</label>
              <Redirect
                v-if="lang === langs[0]"
                :qId="questionsByID[langs[0]].id"
                :holder="option"
                :lang="lang"
                :config="config"
                :qIdInArray="qId"
                :optId="optId"
                class='redirectInOptions'
              />
            </div>
            <label v-if="lang === langs[0]">Text</label>
            <div class="optionTextHolder"
              :class="translationMode || lang === langs[0] ? '' : 'height0'">
              <div class="tileLang" :class="lang === langs[0] ? 'blue' :''"
                @click="$event.target.nextElementSibling.focus()">{{lang}}</div>
              <input type="text" v-model="option.text" placeholder="Illustration subtitle">
            </div>
          </div>
        </div>
        <button :class="answerEdition === qId ? '' : 'height0'" class="add" v-if="answerEdition === qId"
          @click="addOption(qId)">Add option</button>
      </div>
    </div>
  </div>
  <div><button class="add" @click="addQuestion">Add question</button></div>
</div>
</template>

<script>
import Redirect from './redirect'
export default {
  name: 'Questions',
  components: {Redirect},
  data: function(){ return {
    translationMode: true,
    editionMode: -1,
    answerEdition: false,
    currentQ: {
      id: null, lang: null
    }
  }},
  props: ['questions','langs','config'],
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
    updateProp(level, prop, id){
      if(level === 'question'){
        this.langs.slice(1).forEach(function(lang){
          this.questions[lang][id][prop] =
            this.questions[this.langs[0]][id][prop]
        }.bind(this))
      }
      else{
        this.langs.slice(1).forEach(function(lang){
          this.questions[lang][level].options[id][prop] =
            this.questions[this.langs[0]][level].options[id][prop]
        }.bind(this))
      }
    },
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
    addOption(qId){
      this.langs.forEach(function(lang){
        this.questions[lang][qId].options.push(this.$parent.Answer())
      }.bind(this))
    },
    removeOption(qId,id){
      this.langs.forEach(function(lang){
        this.questions[lang][qId].options.splice(id,1)
      }.bind(this))
    },
    visibilityButton: function(lang){
      return this.translationMode && lang !== this.langs[0] ? 'transparent' : ''
    },
    optionByQuestion: function(id){
      var questionsInId = this.questionsInAllLangs[id]
      var options = {}
      var vm = this
      for(var optionId in questionsInId[this.langs[0]].options){
        if(!options[optionId]) options[optionId] = {}
        this.langs.forEach(function(lang){
          options[optionId][lang] = questionsInId[lang].options[optionId]
        })
      }
      return options
    },
    parseTags: function(option, string){
      option.tags = string.replace(/\s/g, "").split(",")
    }
  }
}
</script>
<style>
#questions{
  width: max-content;
  margin: auto;
  padding-bottom: 10px;
  border-bottom: 5px solid #2266EE;
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
.questionParams{
  margin-left: 10px;
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
  font-family: 'Roboto Mono';
  font-size: 20px;
  padding: 0 7px;
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
  width: 396px;
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
  width: 37px;
  margin-left: 5px;
  border: 1px solid #56585c;
  background-color: #56585c;
  background-image: url('https://img.icons8.com/metro/24/f0f1f5/edit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 29.5px;
  background-size: 24px;
  padding: 4.5px 0px;
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
.optionsRows:not(.height0){
  width: 70%;
  position: relative;
  transition-duration: 0.2s;
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 5px solid #2266EE;
}
.questionHead, .optionsTitle{
  margin-top: 10px;
  padding-top: 5px;
  border: 1px solid #56585c;
  border-bottom: 0;
  border-right: 0;
  border-radius: 2px 0 0 0;
  width: 105px;
  font-weight: bold;
}
.optionsTitle{
  margin-top: 0px;
  padding-left: 10px;
  width: 75px;
}
.optionsHolder > div:not(.optionTextHolder){
  margin-left: 10px;
}
.optionsHolder label{
  margin-top: 5px;
}
.optionsHolder input{
  width: 300px;
}
.optionTextHolder{
  display: flex;
  height: 28px;
}
.optionsHolder:not(:first-child):not(:last-child){
  margin: 5px 0;
}
.optionTextHolder .tileLang{
  border-radius: 2px 0 0 2px;
}
.optionTextHolder input{
  width: 274px;
  border-radius: 0 2px 2px 0;
}
.optionDelete{
  display: inline-block;
  position: absolute;
  left: 297px;
  top: 0;
}
.redirectInOptions{
  width: 322px;
}
</style>