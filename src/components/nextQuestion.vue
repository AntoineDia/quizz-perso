<template>
  <div>
    <select
      class="redirectInput"
      v-model="that.next"
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
  props: ['config','lang','that'],
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
}
</script>
<style scoped>

.redirectInput{
  font-size: 15px;
  padding: 10px 15px;
  width: 331px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.redirectInput:hover{
  border: 1px solid #485f4d;
}
</style>