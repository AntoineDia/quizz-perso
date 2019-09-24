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
      event.target.classList.toggle("active")
      const content = event.target.nextElementSibling
      if (content.style.maxHeight)
        content.style = null
      else
        content.style.maxHeight = 'max-content'
    },
  },
}
</script>

<style scoped>

.collapsible {
  padding: 15px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 18px;
}
.active, .collapsible:hover {
  background-color: #ccc;
}

.collapsible:hover:after{
  color: #eee;
}

.collapsible:after {
  content: '\25C0';
  font-size: 17px;
  color: #ccc;
  float: right;
  margin-left: 5px;
}
.active:after {
  content: "\25BC";
  color: #eee;
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