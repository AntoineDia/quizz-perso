<template>
  <div class='questions'>
    <label>Question</label>
    <div v-for="(qlang, lang) in question" :key="lang">
      <div
        class="questionHolder"
        :class="{'hidden': lang !== lang0 && currentView === 'Unified'}"
        @click="toggle"
      >
        <span class="span"
        v-if="currentView === 'Translation'"
        >{{lang}}</span>

        <input class="question" type="text"
          placeholder="What to ask ?"
          v-model='qlang.question'
        >
      </div>

      <div class="content"
        :class="{'hidden': lang !== lang0 && currentView === 'Unified'}"
      >
        <div>
          <label>Redirect to</label>
          <Redirect
            :holder="qlang"
            :lang="lang"
            :config="config"
          ></Redirect>
        </div>

        <div class="dual">
          <div>
            <label>Columns</label>
            <input type="number" v-model="qlang.col">
          </div>
          <div>
            <label>Rows</label>
            <input type="number" v-model="qlang.row">
          </div>
        </div>

        <div class="clear"></div>

        <div class="dual">
          <div>
            <label>Min</label>
            <input type="number" v-model="qlang.min">
          </div>
          <div>
            <label>Max</label>
            <input type="number" v-model="qlang.max">
          </div>
        </div>

        <div class="clear"></div>

        <Answer
          :options="qlang.options"
          :config="config"
          :lang="lang"
        ></Answer>

      </div>

    </div>
  </div>
</template>

<script>
import Redirect from './redirect'
import Answer from './answer'

export default {
  name: 'QuestionComp',
  props: ['currentView','question','lang0','config'],
  components: {Answer, Redirect},
  methods:{
    updateQuestion(obj,val){
      obj.question = val
    },
    toggle(ev){
      let $qHolder
      if(ev.target.className.includes("questionHolder")) $qHolder = event.target
      else return
      $qHolder.classList.toggle("active")
      let $content = $qHolder.nextElementSibling
      if ($content.style.maxHeight) $content.style = null
      else $content.style.maxHeight = 'max-content'
    },
  }
}
</script>

<style scoped>
.questions{
  width: max-content;
  margin: auto;
  margin-bottom: 15px;
}

.questionHolder > *{
  display: inline-block;
}
.span {
  cursor: pointer;
  background-color: #ccc;
  padding: 10px 0px;
  position: relative;
  text-align: center;
  text-transform: capitalize;
  width: 45px;
}
.question{
  width: 500px;
}
.questionHolder:after{
  content: '\25C0';
  font-size: 17px;
  color: #aaa;
  float: right;
  width: 0;
  position: relative;
  cursor: pointer;
  left: -5%;
  transform: translateY(49%);
}

.active:after {
  content: "\25BC";
}
.hidden{
  display: none;
}
.content {
  max-height: 0;
  overflow: hidden;
  transition: 0.2s ease-out;
  background-color: #eee;
}
.clear{
  clear: both;
  height: 7px;
}
.content > div{
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.dual{
  margin: auto;
}
.dual > div{
  float: left;
}
.dual input{
  width: 100px;
}
</style>

// question[lang].question

// v-on:input="updateQuestion(qlang, $event.target.value)"