<template>
<div id="hs-app">

  <Langs
    :langs="langs"
    :currentLangs="currentLangs"
    @update="updateLang"
  />

  <Tags
    :tags="tags"
    :langs="langs"
    :questions="questions"
    :tagByid="tagByid"
    v-on:tag-update="updateTag"
  />

  <Questions
    :currentLangs="currentLangs"
    :langs="langs"
    :questions="questions"
    :tags="tags"
    :arrayEdit="arrayEdit"
    :lastId="lastId"
    :tagByid="tagByid"
  />

</div>
</template>
<script>
import Langs from './components/langs'
import Tags from './components/tags'
import Questions from './components/questions'
import defaultQuestionary from './defaultQuestionary'
export default {
  name: 'App',
  components: {
    Langs, Tags, Questions
  },
  data: function(){
    return {
      langs: ['fr','en','nl'],
      currentLangs: [],
      tags: ['man','woman'],
      questions: defaultQuestionary,
      arrayEdit: [],
      lastId: 1,
      tagByid: [{id:0,name:'man'},{id:1,name:'woman'}],
    }
  },
  watch: {
    tags(){
        var event = new CustomEvent("PersonalityQuizDataSave", {
          detail: {
            tags: this.tags,
            questions: this.questions
          }
        });
        document.dispatchEvent(event)
        // console.log(event.detail)
    },
    questions:{
      deep: true,
      handler(){
          var event = new CustomEvent("PersonalityQuizDataSave", {
            detail: {
              tags: this.tags,
              questions: this.questions
            }
          });
          document.dispatchEvent(event)
        // console.log(JSON.stringify(event.detail))
      }
    }
  },
  methods: {
    updateLang(langs){
      this.currentLangs = langs.slice()
    },
    updateTag(tagsObj){
      this.tagByid = tagsObj
    }
  },
  mounted() {
    var vm = this
    document.addEventListener('PersonalityQuizDataLoad', function(e) {
      setTimeout(function(){
        var json = JSON.parse(e.detail)
        vm.langs = Object.keys(json.questions)
        vm.currentLangs = Object.keys(json.questions)
        vm.questions = {... json.questions}
        vm.tags = json.tags
        vm.lastId = vm.questions[vm.langs[0]].length
        vm.arrayEdit  = vm.questions[vm.langs[0]].map((q,i) => {
          return i
        })
      },0)
    })
  },
}
</script>
<style scoped> @import url('./style/main.css'); </style>