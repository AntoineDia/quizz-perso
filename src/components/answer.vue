<template>
  <div>

    <div class="options" @click="toggleOptions">Options</div>

    <div class="answer">
      <div
        v-for = "(answer,i) in options" :key="i"
      >
        <div class="tab2">
          <label>Src</label>
          <input type="text" placeholder="Image source" v-model="answer.src">
        </div>
        <div class="tab2">
          <label>Redirect to</label>
          <Redirect
            :holder="answer"
            :lang="lang"
            :config="config"
            :qId="qId"
          ></Redirect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Redirect from './redirect'
export default {
  name: 'Answer',
  props: ['options','config','lang','qId'],
  components:{ Redirect },
  methods:{
    toggleOptions(ev){
      ev.target.classList.toggle("optionactive")
      let $content = ev.target.nextElementSibling
      if ($content.style.maxHeight) $content.style = null
      else $content.style.maxHeight = 'max-content'
    }
  }
}
</script>

<style scoped>
.answer{
  margin: 10px;
  margin-left: 0;
  padding-left: 10px;
  border-left: 1px solid #ccc;
  max-height: 0;
  overflow: hidden;
  width: 400px;
}
input{
  width: 368px;
}
.tab2{
  margin: 10px auto;
}
.options{
  background-color: #ccc;
  padding: 10px 15px;
  cursor: pointer;
}
.options:after{
  content: '\25C0';
  float: right;
}
.optionactive:after{
  content: "\25BC";
}

</style>