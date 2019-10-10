<template>
  <div>
    <div>
      <div class="holderRedirect">

        <p class="selector"
          @click="toggleList"
          ref="selector"
        >{{selectedBind}}</p>

        <div class="optionsHolder" ref="optionsHolder">
          <p class="options"
            v-for="(question, i) in questionsChoice" :key = "question.id + i"
            @click="newNext(question.id)"
            :style="{ transform: slide(i) }"
          >{{question.question}}</p>
          <p
            class="options finish"
             @click="newNext(-1)"
            :style="{ transform: slide(questionsChoice.length) }"
          >Finish</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  props: ['holder','lang','langs','qId','questions','optId'],
  data(){
    return {
      next: false,
      selected: 'Next question (default)',
      next: '',
    }
  },
  methods:{
    slide(i){
      return 'translateY('+ i * 100 +'%)'
    },
    toggleList(event){
      event.target.classList.toggle('active')
      const answers = event.target.nextElementSibling
      if(answers.style.display === 'block') answers.style.display = 'none'
      else answers.style.display = 'block'
    },
    newNext(i){
      this.holder.next = i
      console.log(this.holder.next)
      if(this.$refs.optionsHolder.style.display === 'block')
        this.$refs.optionsHolder.style.display = 'none'
      else this.$refs.optionsHolder.style.display = 'block'
    },
  },
  computed:{
    questionsChoice(){
      var vm = this
      const questions = []
      this.questions[this.lang].forEach((q,i) => {
        if(i === this.qId) return
        let qTemp = {}
        qTemp = {
          id: q.id,
          question: (i+1)+ ' ' + (q.question || 'Question')
        }
        questions.push(qTemp)
      })
      var exist = false
      questions.forEach(function(q){
        if(this.next === q.id) exist = true
      }.bind(this))
      if(!exist && this.next !== -1) this.next =''
      return questions
    },
    selectedBind(){
      if(this.holder.next === -1) return 'Finish'

      var q = this.questionsChoice.find(el =>{
        return el.id === this.holder.next
      })

      if(!q) return this.selected
      return (q.question || 'Question ' + (this.qId))
    },
  },
}
</script>
<style scoped>
.holderRedirect{
  z-index: 5000;
  position: relative;
}
.redirectInput{
  font-size: 15px;
  padding: 10px 15px;
  border: 1px solid #56585c;
  cursor: pointer;
  border-radius: 3px;
}
.redirectInput:hover{
  border: 1px solid #0b0c0c;
}
.selector:hover{
  border: 1px solid #0b0c0c;
}
.selector{
  background-color: #f5fbfa;
  border: 1px solid #56585c;
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
  border-radius: 3px;
}
.optionsHolder{
  display: none;
  position: relative;
  width: 100%;
}
.options{
  background-color: #f5fbfa;
  border: 1px solid #56585c;
  padding: 5px 10px;
  cursor: pointer;
  border-top: 0;
  position: absolute;
  width: 100%;
}
.options:not(:last-child){
  border-radius: 0;
}
.options:hover{
  background-color: #eee;
}
/* .active:after{
  content: "\25BC";
} */
.finish{
  border-bottom: 1px solid #56585c;
  border-radius: 0 0 3px 3px;

}
</style>