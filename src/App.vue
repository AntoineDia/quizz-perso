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

    <div class="save">
      <button @click="save">Get JSON</button>
      <div><br>{{msg}}</div>
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
      config: new Questionary(),
      msg: '',
    }
  },
  watch:{
    config:{
      deep: true,
      handler(updt){console.log(updt)}
    }
  },
  methods:{
    save(){
      const str = JSON.stringify(this.config)
      console.log(str)
      this.msg = 'Json Stringified in console'
    }
  },
}
</script>

<style>
*{
  margin: 0; padding: 0;
  font-family: sans-serif;
  color: #444;
  outline: 0;
  border-style: none;
}
input, label {
  display:block;
}
input{
  border: 1px solid #ccc;
  padding: 10px 15px;
  font-size: 15px;
}
button{
  font-size: 15px;
  background-color: #eee;
  cursor: pointer;
}
button:hover{
  background-color: #eee;
}
input:hover, input:focus{
  border: 1px solid #444;
}
.tab{
  padding: 0 18px;
}
.save{
  text-align: center;
  margin-top: 10px;
}
.save > button{
  font-size: 20px;
  background-color: aquamarine;
  padding: 15px;
  border-radius: 10px;
}
.save > button:hover{
  background-color: cornflowerblue;
  color: white;
}
</style>