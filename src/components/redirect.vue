<template>
  <div>
    <select
      class="redirectInput"
      v-model="holder.next"
    >
      <option value="-1">Next Question</option>
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
  name: 'Redirect',
  props: ['holder','lang','config'],
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
  width: 100%;
  border: 1px solid #ccc;
  cursor: pointer;
}
.redirectInput:hover{
  border: 1px solid #485f4d;
}
</style>