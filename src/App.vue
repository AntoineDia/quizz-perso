<template>
  <div id="app">
    <div>

      <Collapible
        name = "Main"
        :childComponent = "'Main'"
        :config="config"
      ></Collapible>
      <Collapible
        name = "Languages"
        :childComponent = "'Langues'"
        :config="config"
      ></Collapible>
      <Collapible
        name = "Questions"
        :childComponent = "'Questions'"
        :config="config"
      ></Collapible>

    </div>
  </div>
</template>

<script>
import { Questionary } from './Objects'
import Collapible from './components/collapsible'

export default {
  name: 'App',
  components:{
    Collapible
  },
  data(){
    return {
      config: new Questionary,
      oldConfig: {},
    }
  },
  created() {
    this.oldConfig = {...this.config}
  },
  watch:{
    // config:{
    //   deep: true,
    //   handler(){
    //     console.log()
    //     for(let lang in this.config.questions) {
    //       if(
    //         JSON.stringify(this.config.questions[lang]) !==
    //         JSON.stringify(this.oldConfig.question[lang])
    //       ){
    //         console.log('here')
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style>
*{
  margin: 0; padding: 0;
  font-family: sans-serif;
  color: #485f4d;
  outline: 0;
}
input, label {
  display:block;
}
input{
  border-style: none;
  border: 1px solid #ccc;
  padding: 10px 15px;
  font-size: 15px;
}
button{
  font-size: 15px;
}
input:hover, input:focus{
  border: 1px solid #485f4d;
}
.tab{
  padding: 0 18px;
}
</style>