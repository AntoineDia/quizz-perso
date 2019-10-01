<template>
  <div>
    <div>
      <div class="holderRedirect">

        <p class="selector"
          @click="toggleList"
        >{{selectedBind}}</p>

        <div class="optionsHolder">
          <p class="options"
            v-for = "(question, i) in questionsChoice" :key = "question.id + i"
            :value="question.id"
            @click="updateNext($event, question)"
          >{{question.question}}</p>
          <p
            class="options finish"
            @click="updateNext($event, -1)"
          >Finish</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  props: ['holder','lang','config','qId','optId','qIdInArray'],
  data(){
    return {
      next: false,
      selected: 'Next question (default)',
      id: '',
    }
  },
  methods:{
    slide(i){
      return 'translateY('+ i * 100 +'%)'
    },
    toggleList(event){
      event.target.classList.toggle('active')
      const options = event.target.nextElementSibling
      if(options.style.display === 'block') options.style.display = 'none'
      else options.style.display = 'block'
    },
    updateAll(){
      if(!this.optId){
        var idArray = this.$parent.questions[this.lang].findIndex(function(q){
          return q.id === this.holder.id
        }.bind(this))
        this.$parent.updateProp('question','next',idArray)
      }else{
        this.$parent.updateProp(this.qIdInArray, 'next', this.optId)
      }
    },
    updateNext(event, value){
      const $selector = event.target.parentElement.parentElement.querySelector('.selector')
      if(value !== -1){
        this.id = value.id
        this.holder.next = value.id
      }
      else{
        this.id = -1
        this.holder.next = -1
      }
      this.updateAll()
      $selector.dispatchEvent(new Event('click'))
    },
  },
  watch:{
    holder:{
      deep: true,
      handler(){
        this.id = this.holder.next
      }
    }
  },
  computed:{
    questionsChoice(){
      var vm = this
      const questions = []
      this.config.questions[this.lang].forEach((q,i) => {
        if(q.id === this.qId) return this.next = true
        let qTemp = {}
        if(this.next) {
          if(this.id === '') {
            this.id = q.id
          }
          qTemp = {
            id: q.id,
            question: 'Next Question: ' + (q.question || 'Question ' + (i+1))
          }
        }
        else qTemp = {
          id: q.id,
          question: 'Question '+ (i+1)+ ' ' +q.question
        }
        questions.push(qTemp)
        this.next = false
      })
      this.next = false
      var exist = false
      questions.forEach(function(q){
        if(this.id === q.id) exist = true
      }.bind(this))
      if(!exist && this.id !== -1) this.id =''
      vm.holder.next = this.id
      if(this.id !== '') this.updateAll()
      return questions
    },
    selectedBind(){
      if(this.id === -1) return 'Finish'
      if(this.id === ''){
        return 'Next question (default)'
      }
      let q = this.questionsChoice.find(el => {
        return (el.id === this.id)
      })
      if(!q) return this.selected
      if(!q.question) return 'Question n°' + q.id + ' (no question text yet)'
      return q.question
    },
  },
}
</script>
<style scoped>
.redirectInput{
  font-size: 15px;
  padding: 10px 15px;
  width: 100%;
  border: 1px solid #56585c;
  background-color: #f5fbfa;
  cursor: pointer;
}
.redirectInput:hover{
  border: 1px solid #0b0c0c;
}
.holderRedirect{
  position: relative;
  widows: 100%;
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
}
.selector:after{
  content: '\25B6';
  float: right;
}
.optionsHolder{
  display: none;
}
.options{
  background-color: #f5fbfa;
  width: calc(100% - 22px);
  border: 1px solid #56585c;
  padding: 5px 10px;
  cursor: pointer;
  border-top: 0;
}
.options:not(:last-child){
  border-radius: 0;
}
.options:hover{
  background-color: #eee;
}
/*
.active:hover{
  border: 1px solid #ccc;
  background-color: #eee;
} */
.active:after{
  content: "\25BC";
}
.finish{
  border-bottom: 1px solid #db3254;
  border-radius: 0 0 2px 2px;
}
</style>