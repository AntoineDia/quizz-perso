<template>
  <div class='tab'>
    <span
      class="selectedLang"
      v-for="lang in config.languages"
      :key="lang"
    >| {{lang.toUpperCase()}} |</span>
    <div class="newLang">
      <input
        type="text"
        placeholder="Lang"
        v-on:keyup.enter="newLangage"
        v-model="newLang"
      >
      <button @click="newLangage">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Langues',
  props: ['config'],
  data(){
    return{
      newLang: ''
    }
  },
  methods:{
    newLangage(){
      if(this.newLang.length !== 2) {
        document.querySelector('.newLang > input').className = 'error'
        return
      }
      document.querySelector('.newLang > input').className = ''
      this.config.addLang(this.newLang)
      this.newLang = ''
    },
  },
}
</script>

<style scoped>

.selectedLang{
  background-color: #ccc;
  padding: 5px;
  margin: 0 2px;
  white-space: none;
}

.newLang{
  margin: 15px auto;
}
.newLang > *{
  display: inline;
}
.error{
  border: 1px solid red;
}
input{
  width: 55px;
}
button{
  cursor: pointer;
  padding: 10px 15px;
  background-color: #ccc;
  border-style: none;
  border: 1px solid #ccc;
}
button:active, button:hover{
  background-color: white;
  border: 1px solid #ccc;
}

</style>