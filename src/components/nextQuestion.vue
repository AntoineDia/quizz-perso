<template>
  <div>
    <select
      class="redirectInput"
      v-model="that.next"
      @click="syncRedirect"
    >
      <option value="">Next Question</option>
      <option
        v-for = "(question, i) in questionsChoice"
        :key = "question.id"
        :value = "question.id"
      >{{question.question || 'Question n°' + (i+1)}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'NextQuestion',
  props: ['config','lang','that','i'],
  watch:{
    that:{
      deep: true,
      handler(){
        this.$emit('next-update')
      }
    }
  },
  computed:{
    questionsChoice(){
      const questions = []
      this.config.questions[this.lang].forEach(q => {
        questions.push({
          id: q.id,
          question: q.question
        })
      })
      return questions
    }
  },
  methods:{
    syncRedirect(){
      console.log(this.i)
      this.config.languages.forEach(lang => {
        try{
          this.config.questions[lang][this.i].next = this.that.next
        }catch(e){}

      })
    }
  },
}
</script>
<style scoped>

.redirectInput{
  font-size: 15px;
  padding: 10px 15px;
  width: 100%;
  border: 1px solid #ccc;
  cursor: pointer;
}
.redirectInput:hover{
  border: 1px solid #485f4d;
}
</style>