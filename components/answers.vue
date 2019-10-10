<template>
<div >

<div class="hs-questionNumber">
  <div v-for="(answer, iAnswer) in answers" :key="iAnswer"
  :class="{'hs-selected' : ~selectedAnswers.indexOf(iAnswer)}"
    @click="selectedAnswers = [iAnswer]"
    class="hs-headNumber"
    >{{$parent.cleanNumber(iAnswer)}}</div>
  <div class="hs-new"
    @click="addAnswer()"
  >+</div>
</div>
<div class="hs-answersMaster">
<div class="hs-answers"
  v-for="(answer, iAnswer) in answers" :key="iAnswer"
  :class="{ 'hs-hiddenInSight':  !~selectedAnswers.indexOf(iAnswer)}"
>
  <div class="hs-questionRow">
    <div class="hs-questionBody">

      <div class="hs-labelInput">
        <div class="hs-headNumber">
          <div :class="{ 'hs-disabled' : !arrInclude(editionAnswer, iAnswer)}">
            <span>{{ $parent.cleanNumber(iAnswer) }}</span>
            <span class="hs-borderBottom"></span>
          </div>
        </div>
        <span>Answer</span>
      </div>

    <div class="hs-textInputHolder">
      <div
        v-for="lang in currentLangs" :key="lang"
        class="hs-inputRow"
      >
        <label>{{lang}}</label>
        <input v-model="questions[lang][i].answers[iAnswer].text">
      </div>
    </div>

    <div class="hs-questionParams">
        <label class="hs-labelInput hs-redirectLabel"
          v-if="branching || ~answerBranch.indexOf(iAnswer)"
        >Answer redirect</label>
        <div style="position:relative"
          v-if="branching || ~answerBranch.indexOf(iAnswer)"
        >
          <div class="hs-inputRow hs-redirect">
            <Redirect
              class="hs-redirect"
              :holder="answer"
              :lang="currentLangs[0]"
              :qId="i"
              :questions="questions"
              :langs="langs"
              :optId="iAnswer"
            />
          </div>
        </div>
        <template
          v-if="~editionAnswer.indexOf(iAnswer)"
        >
          <label class="hs-labelInput">Picture source</label>
          <div class="hs-inputRow">
            <input type="text" v-model="answer.src"
              @click="$event.target.select()"
            >
          </div>
            <div class="hs-imgHolder"
              v-if="arrInclude(answerBranch, iAnswer) || arrInclude(editionAnswer,iAnswer) || branching"
              :style="{ backgroundImage : `url(${answer.src})` }"
            ></div>
          <label class="hs-labelInput">Tags: {{answer.tags.length}} selected</label>
          <div class="hs-tagsRow">
            <span
              v-for="(tag, i) in tags" :key="tag"
              @click="toggleInArray(answer.tags, i)"
            ><span v-if="~answer.tags.indexOf(i)"
                class="hs-coshed"
              ></span>
              <span v-else
                class="hs-uncoshed"
              ></span>{{tag}}</span>
          </div>
        </template>
      </div>

    </div>

    <div class="hs-edition">
        <div class="hs-editIcon"
          @click="[
            toggleInArray(editionAnswer,iAnswer),
            arrInclude(answerBranch,iAnswer) &&
            arrInclude(editionAnswer,iAnswer) ? '' :
            toggleInArray(answerBranch,iAnswer)
          ]"
        ><span
         :class="{ 'hs-disabled' : !arrInclude(editionAnswer,iAnswer)  }"
        ></span>
          <span class="hs-borderBottom"
            :class="{ 'hs-disabled' : !arrInclude(editionAnswer,iAnswer)  }"
          ></span>
        </div>
        <i class="hs-deleteIcon"
          @click="$parent.confirmation(' answer ',iAnswer) ? deleteAnswer(iAnswer) : ''"
        ></i>
    </div>


  </div>

</div>

</div>
</div>
</template>
<script>
import Redirect from './redirect'
export default {
  name: 'Answers',
  props: ['i', 'answers', 'questions','langs','currentLangs', 'branching', 'tags'],
  components: { Redirect },
  data() {
    return {
      answerBranch: [],
      editionAnswer: [0,1],
      selectedAnswers: [0]
    }
  },
  methods: {
    toggleInArray(arr, item){
      ~arr.indexOf(item) ?
        arr.splice(arr.indexOf(item), 1) :
        arr.push(item)
    },
    arrInclude(arr,item){
      return !!~arr.indexOf(item)
    },
    deleteAnswer(iAnswer){
      this.langs.forEach(function(lang){
        this.questions[lang][this.i].answers.splice(iAnswer, 1)
      }.bind(this))
    },
    addAnswer(iAnswer){
      this.editionAnswer.push(this.questions[this.langs[0]][this.i].answers.length)
      this.langs.forEach(function(lang){
        this.questions[lang][this.i].answers.push({
          text: '',
          next: '',
          tags: [],
          src: 'https://picsum.photos/200/300',
        })
      }.bind(this))
    }
  },
}
</script>