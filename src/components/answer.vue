<template>
  <div class="answer">
    <div
      v-for = "answer in config.questions[lang][i].options"
    >
      <div class="tab2">
        <label>Src</label>
        <input type="text" placeholder="Image source">
      </div>
      <div class="tab2">
        <label>Redirect to</label>
        <NextQuestion
          :config="config"
          :lang="lang"
          :that="answer"
        ></NextQuestion>
      </div>
    </div>

  </div>
</template>

<script>
import NextQuestion from './nextQuestion'
export default {
  name: 'Answer',
  props: ['config','lang','i'],
  components:{NextQuestion}
}
</script>

<style scoped>
.answer{
  margin: 10px;
  margin-left: 0;
  padding-left: 10px;
  border-left: 1px solid #485f4d;
}
input{
  width: 280px;
}
.tab2{
  margin: 10px auto;
}
</style>