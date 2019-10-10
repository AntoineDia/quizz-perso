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
  />

  <Questions
    :currentLangs="currentLangs"
    :langs="langs"
    :questions="questions"
    :tags="tags"
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
  watch: {
    tags(){
      var event = new CustomEvent("PersonalityQuizDataSave", {
        detail: {
          tags: this.tags,
          question: this.questions
        }
      });
      document.dispatchEvent(event)
    },
    questions(){
      var event = new CustomEvent("PersonalityQuizDataSave", {
        detail: JSON.stringify({
          tags: this.tags,
          question: this.questions
        })
      });
      document.dispatchEvent(event)
    }
  },
  data: function(){
    return {
      langs: ['fr','en','nl'],
      currentLangs: [],
      tags: ['man','woman'],
      questions: defaultQuestionary
    }
  },
  methods: {
    updateLang(langs){
      this.currentLangs = langs.slice()
    }
  },
  mounted() {
    var vm = this
    document.addEventListener('PersonalityQuizDataLoad', function(e) {
      var json = JSON.parse(e.detail)
      vm.questions = json.questions ? json.questions : vm.questions
      vm.tags = json.tags ? json.tags : vm.tags
    })
  },
}
</script>
<style scoped> @import url('./style/main.css'); </style>