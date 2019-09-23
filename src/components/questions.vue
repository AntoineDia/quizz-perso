<template>
  <div class="row">
    <div>
      <div
        class="col"
        v-for="lang in config.languages"
        :key="lang"
      >

        <div class="lang">| {{lang.toUpperCase()}} |</div>

        <div
          class="questions"
          v-for="(question, i) in config.questions[lang]"
          :key="question.id"
        >

          <div class="input">
            <label>Question</label>
            <input type="text" placeholder="What do you want to ask ?"
              v-model="config.questions[lang][i].question"
            >
          </div>

          <div class="input">
            <label>Redirecto to</label>
            <NextQuestion
              :config="config"
              :lang="lang"
              :that="config.questions[lang][i]"
              v-on:next-update="sync('next',i,lang)"
            ></NextQuestion>
          </div>

          <div class="input">
            <label>Collumns - Rows</label>
            <div class="dualInput">
              <input type="number" placeholder="Collumns"
                v-model="config.questions[lang][i].col"
                @input="sync('col',i,lang)"
              >
              <input type="number" placeholder="Rows"
                v-model="config.questions[lang][i].row"
                @input="sync('row',i,lang)"
              >
            </div>
          </div>

          <div class="input">
            <label>Min - Max</label>
            <div class="dualInput">
              <input type="number" placeholder="Min"
                v-model="config.questions[lang][i].min"
                @input="sync('min',i,lang)"
              >
              <input type="number" placeholder="Max"
                v-model="config.questions[lang][i].max"
                @input="sync('max',i,lang)"
              >
            </div>
          </div>
          <div class="removeQuestion">
            <button @click="removeQuestion">Remove question</button>
          </div>
        </div>

        <div class = "addQuestion">
          <button @click="newQuestion">New question</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from '../Objects'
import NextQuestion from './nextQuestion'
export default {
  name: 'Questions',
  props: ['config'],
  components: { NextQuestion },
  methods:{
    newQuestion(){
      for(let lang in this.config.questions){
        this.config.questions[lang].push(new Question)
      }
      this.$emit('re-expand')
    },
    removeQuestion(){
      console.log('todo remove question')
    },
    sync(el, i, lg){
      this.config.languages.forEach(lang => {
        this.config.questions[lang][i][el] = this.config.questions[lg][i][el]
        console.log('new',this.config.questions[lg][i][el])
        console.log('old',this.config.questions[lang][i][el])
      })
      this.config.questions
    },
  }
}
</script>

<style scoped>
.row{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.col{
  display: inline-block;
  width: min-content;
  padding: 15px;
  border-right: 1px solid #485f4d;
}
.lang{
  width: min-content;
  background-color: #ccc;
  white-space: none;
  padding: 5px;
  margin-bottom: 10px;
  margin: auto;
  font-size: 30px;
}
.addQuestion > button{
  margin-top: 10px;
}
.addQuestion > button, .removeQuestion > button{
  width: 331px;
  padding: 10px 15px;
  background-color: #ccc;
  border: 1px solid #ccc;
}
.addQuestion > button:hover, .removeQuestion > button:hover{
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
}
input{
  width: 300px;
}
.input{
  margin: 15px auto;
}
.dualInput > input{
  display: inline-block;
  width: 134px;
}
.redirect::placeholder{
  color: #485f4d;
}

</style>