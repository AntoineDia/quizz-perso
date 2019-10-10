<template>
<div>

<div class="hs-questionNumber">
  <div v-for="(question, i) in questions[langs[0]]" :key="i"
    :class="{'hs-selected' : i === selectedQuestion}"
    @click="selectedQuestion = i"
    class="hs-headNumber"
    >{{cleanNumber(i)}}</div>
  <div class="hs-new"
    @click="addQuestion()"
  >+</div>
</div>

<div
  class="hs-questions"
  v-for="(question, i) in questions[currentLangs[0]]" :key="i"
  :class="{'hs-hiddenInSight' : selectedQuestion !== i }"
>

  <div class="hs-questionRow">

    <div class="hs-questionBody">

      <div class="hs-labelInput">
        <div class="hs-headNumber">
        <div :class="{ 'hs-disabled' : !arrInclude(editionQuestions, i)}">
          <span>{{ cleanNumber(i) }}</span>
          <span class="hs-borderBottom"></span>
        </div>
      </div>
      <span>
        Question
      </span>
      </div>

      <div class="hs-textInputHolder">
        <div
          class="hs-inputRow"
          v-for="lang in currentLangs" :key="lang"
        >
          <label>{{lang}}</label>
          <textarea
            row="1"
            v-model="questions[lang][i].question"
            class="hs-inputRowInput"
            @input="resizeArea($event.target)"
            @click="resizeArea($event.target)"
            spellcheck="false"
          ></textarea>
        </div>
      </div>

      <div class="hs-questionParams">

        <label class="hs-labelInput hs-redirectLabel"
          v-if="arrInclude(questionBranch, i) || arrInclude(editionQuestions,i)"
        >Auto redirect</label>
        <div style="position:relative"
          v-if="arrInclude(questionBranch, i) || arrInclude(editionQuestions,i)"
        >
          <div class="hs-inputRow hs-redirect">
            <Redirect
              class="hs-redirect"
              :holder="question"
              :lang="currentLangs[0]"
              :qId="i"
              :questions="questions"
              :langs="langs"
            />
          </div>
        </div>
        <div class="hs-dual"
          v-if="arrInclude(editionQuestions,i)"
        >
          <div>
            <label class="hs-labelInput">Choices</label>
            <div class="hs-inputRow">
              <label>min</label>
              <input type="number"
                v-model="question.min"
              >
            </div>
            <div class="hs-inputRow">
              <label>max</label>
              <input type="number"
                v-model="question.max"
              >
            </div>
          </div>
          <div>
            <label class="hs-labelInput">Disposition</label>
            <div class="hs-inputRow">
              <label>rows</label>
              <input type="number"
                v-model="question.row"
              >
            </div>
            <div class="hs-inputRow">
              <label>cols</label>
              <input type="number"
                v-model="question.col"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hs-edition">
        <div class="hs-editIcon"
          @click="[
            toggleInArray(editionQuestions,i),
            arrInclude(questionBranch,i) &&
            arrInclude(editionQuestions,i) ? '' :
            toggleInArray(questionBranch,i)
          ]"
        ><span
         :class="{ 'hs-disabled' : !arrInclude(editionQuestions, i)  }"
        ></span>
          <span class="hs-borderBottom"
            :class="{ 'hs-disabled' : !arrInclude(editionQuestions, i)  }"
          ></span>
        </div>
        <i class="hs-deleteIcon"
          @click="confirmation(' question ',i) ? deleteQuestion(i) : ''"
        ></i>
    </div>

  </div>

  <Answers
    class="hs-answerComponent"
    :i='i'
    :questions='questions'
    :answers='question.answers'
    :langs='langs'
    :currentLangs='currentLangs'
    :tags="tags"
    :branching="arrInclude(questionBranch,i)"
  />
</div>

</div>
</template>
<script>
import Answers from './answers'
import Redirect from './redirect'
export default {
  name: 'Questions',
  props: ['questions','langs','currentLangs', 'tags'],
  components: { Answers, Redirect },
  data() {
    return {
      questionBranch: [0],
      editionQuestions: [0],
      lastQuestionId: this.questions[this.langs[0]].length,
      selectedQuestion: 0,
    }
  },
  methods: {
    cleanNumber(i){
      return i <= 8 ? '0' + (i+1) : (i+1)
    },
    toggleInArray(arr, item){
      ~arr.indexOf(item) ?
        arr.splice(arr.indexOf(item), 1) :
        arr.push(item)
    },
    arrInclude(arr,item){
      return !!~arr.indexOf(item)
    },
    confirmation: function(item,id){
      return confirm('Are you sure you want to delete' + item + (id + 1 ) + '?')
    },
    deleteQuestion(i){
      this.langs.forEach(function(lang){
        this.questions[lang].splice(i, 1)
      }.bind(this))
    },
    addQuestion(){
      this.editionQuestions.push(this.questions[this.langs[0]].length)
      this.langs.forEach(function(lang){
        this.questions[lang].push({
          question: '',
          id: this.lastQuestionId,
          col: 2, row: 1,
          min: 1, max: 1,
          next : this.lastQuestionId + 1,
          answers: [{
            text: '',
            next: '',
            tags: [],
            src: 'https://picsum.photos/200/300',
          }]
        })
      }.bind(this), {})
      this.lastQuestionId = this.lastQuestionId + 1
    },
    resizeArea(area){
      setTimeout(function(){
        var scrollHeigth = area.scrollHeight
        if(scrollHeigth < 42) {
          return area.style.cssText = 'height:' + 25 + 'px';
        }
        area.style.cssText = 'height:auto'
        area.style.cssText = 'height:' + area.scrollHeight + 'px';
      },0);
    }
  },
  computed: {
    lang0(){
      return this.questions[this.currentLangs[0]]
    }
  },
  watch:{
    lang0:{
      deep: true,
      handler(){
        var propsQuestion = ['next','col','row','min','max']
        var propsAnswer = ['next','src','tags']
        this.langs.forEach(function(lang){
          if(lang === this.currentLangs[0]) return
          this.questions[lang].forEach(function(q,i){
            propsQuestion.forEach(function(prop){
              q[prop] = this.questions[this.currentLangs[0]][i][prop]
            }.bind(this))
          }.bind(this))
        }.bind(this))

        this.langs.forEach(function(lang){
          if(lang === this.currentLangs[0]) return
          this.questions[lang].forEach(function(q,i){
            q.answers.forEach(function(answer,j){
              propsAnswer.forEach(function(prop){
                if(prop === 'tags'){
                  answer[prop] = this.questions[this.currentLangs[0]][i].answers[j][prop].slice()
                }
                 answer[prop] = this.questions[this.currentLangs[0]][i].answers[j][prop]
              }.bind(this))
            }.bind(this))
          }.bind(this))
        }.bind(this))
      }
    }
  },
}
</script>