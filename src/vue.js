var vm = new Vue({
  el: '#app',
  data:{
    defaultLangs : ['fr','en'],
    config: {},
    currentId: -1,
  },
  methods:{
    Questionary: function(){
      return {
        name : '',
        langs: vm.defaultLangs,
        questions: vm.Question(vm.defaultLangs),
      }
    },
    Question: function(langs){
      this.currentId++
      return langs.map( function(lang){
        return {
          [lang]:{
            question : '',
            id : 'q' + vm.currentId,
            next : '',
            max : 1, min : 1,
            col : 2, row : 1,
            options : [vm.Answer(), vm.Answer()],
          }
        }
      })
    },
    Answer: function(){
      return {
        src: '', tags: [], next: ''
      }
    },
  }
})