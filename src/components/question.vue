<template>
  <div class='questions'>
    <label>Question {{i}}</label>
    <div v-for="(qlang, lang) in question" :key="lang">
      <div
        class="questionHolder"
        :class="{'hidden': lang !== lang0 && currentView === 'Flow'}"
      >
        <div class="span"
        v-if="currentView !== 'Flow'"
        >{{lang}}</div>

        <input class="question" type="text"
          placeholder="What to ask ?"
          v-model='qlang.question'
        >

        <div class="span expand"
          @click="toggle"
          :class="{'hidden': currentView === 'Translation'}"
        >➕</div>

      </div>

      <div class="content"
        :class="{'hidden': lang !== lang0 && currentView === 'Flow'}"
      >
        <div>
          <label>Redirect to</label>
          <Redirect
            :qId="qlang.id"
            :holder="qlang"
            :lang="lang"
            :config="config"
          ></Redirect>
        </div>

        <div class="dual">
          <div>
            <label>Columns</label>
            <input type="number" min="1" v-model="qlang.col">
          </div>
          <div>
            <label>Rows</label>
            <input type="number" min="1" v-model="qlang.row">
          </div>
        </div>

        <div class="clear"></div>

        <div class="dual">
          <div>
            <label>Min</label>
            <input type="number" min="1" v-model="qlang.min">
          </div>
          <div>
            <label>Max</label>
            <input type="number" min="1" v-model="qlang.max">
          </div>
        </div>

        <div class="clear"></div>

        <Answer
          :options="qlang.options"
          :config="config"
          :lang="lang"
          :qId="qlang.id"
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
  props: ['currentView','question','lang0','config','i'],
  components: {Answer, Redirect},
  methods:{
    updateQuestion(obj,val){
      obj.question = val
    },
    toggle(ev){
      if(event.target.innerText === '➕')
        event.target.innerText = '➖'
      else event.target.innerText = '➕'
      let $qHolder = event.target.parentNode
      $qHolder.classList.toggle("active")
      let $content = $qHolder.nextElementSibling
      if ($content.style.maxHeight) $content.style = null
      else $content.style.maxHeight = 'max-content'
    },
  },
  watch: {
    question:{
      deep: false,
      handler(newQuestion){
        for(const lang in newQuestion){
          for(const prop in newQuestion[lang]){
            if(prop === 'question') continue
            newQuestion[lang][prop] = newQuestion[this.lang0][prop]
          }
        }


        // if(this.currentView !== 'Flow') return
        // this.config.langs.forEach(lang =>{
        //   let q = this.config.questions[lang].find(q => {
        //     return q.id === newQuestion[this.lang0].id
        //   })
        //   for(const prop in q){
        //     q[prop] = newQuestion[this.lang0][prop]
        //     // if(prop === 'options') return console.log('todo option copy')
        //   }
        // })

      }
    },
    currentView(){
      const $qHolders = document.getElementsByClassName('questionHolder')
      let i
      for(i = 0; i < $qHolders.length; i++){
        const $expand = $qHolders[i].querySelector('.expand')
        if($expand.innerText === '➖') $expand.innerText = '➕'
        const $content = $qHolders[i].nextElementSibling
        if($content.style.maxHeight) $content.style.maxHeight = null
      }
    }
  },
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
  text-align: center;
  text-transform: capitalize;
  width: 45px;
  font-size: 15px;
  height: 100%;
  padding: 10px 0px;
  user-select: none;
}
.question{
  width: 500px;
}
.questionHolder{
  position: relative;
  margin: 3px auto;
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