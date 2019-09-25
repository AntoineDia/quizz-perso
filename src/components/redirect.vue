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
  props: ['holder','lang','config','qId'],
  data(){
    return {
      next: false,
      selected:'Choose a question or the end',
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
    updateNext(event, value){
      const $selector = event.target.parentElement.parentElement.querySelector('.selector')
      const $input = event.target.parentElement.parentElement.querySelector('input')
      if(value !== -1){
        this.id = value.id
        this.holder.next = value.id
      }
      else{
        this.id = -1
        this.holder.next = -1
      }
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
      const questions = []
      this.config.questions[this.lang].forEach((q,i) => {
        if(q.id === this.qId) return this.next = true
        let qTemp = {}
        if(this.next) qTemp = {
          id: q.id,
          question: 'Next Question: ' + (q.question || 'Question ' + (i+1))
        }
        else qTemp = {
          id: q.id,
          question: 'Question '+ (i+1)+ ' ' +q.question
        }
        questions.push(qTemp)
        this.next = false
      })
      this.next = false
      return questions
    },
    selectedBind(){
      if(this.id === -1) return 'Finish'
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
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}
.redirectInput:hover{
  border: 1px solid #444;
}
.holderRedirect{
  position: relative;
  widows: 100%;
}
.selector:hover{
  border: 1px solid #444;
}
.selector{
  background-color: white;
  font-size: 15px;
  border: 1px solid #ccc;
  padding: 10px 15px;
  cursor: pointer;
  user-select: none;
}
.selector:after{
  content: '\25C0';
  float: right;
}
.optionsHolder{
  display: none;
}
.options{
  background-color: white;
  width: calc(100% - 32px);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 10px 15px;
  cursor: pointer;
}
.options:hover{
  background-color: #eee;
}
.active:hover{
  border: 1px solid #ccc;
  background-color: #eee;
}
.active:after{
  content: "\25BC";
}
.finish{
  border-bottom: 1px solid #ccc;
}
</style>