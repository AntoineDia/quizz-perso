<template>
  <div>
    <button
      class="collapsible"
      @click="toggle"
    >{{name}}</button>
    <p class="content">
      <component
        class="child"
        :is="childComponent"
        :config="config"
        v-on:question-update="syncQuestions"
      ></component>
    </p>

  </div>
</template>

<script>
import Main from './main'
import Langues from './langues'
import Questions from './questions'

export default {
  name: 'Collapsible',
  props: ['name','childComponent','config'],
  components:{
    Main, Langues, Questions
  },
  methods:{
    toggle(event){
      console.log('event in collapsibel', this.config)
      event.target.classList.toggle("active")
      const content = event.target.nextElementSibling
      if (content.style.maxHeight)
        content.style = null
      else
        content.style.maxHeight = 'max-content'
    },
    syncQuestions(origin){
      console.log(origin)
    }
  },
}
</script>

<style scoped>

.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #ccc;
}

.collapsible:after {
  content: '\02795'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: white;
  float: right;
  margin-left: 5px;
}
.active:after {
  content: "\2796"; /* Unicode character for "minus" sign (-) */
}

.content {
  max-height: 0;
  overflow: hidden;
  transition: 0.2s ease-out;
  background-color: #fbfbfb;
}

.child{
  margin: 15px auto;
}

</style>