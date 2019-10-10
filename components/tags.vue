<template>
<div>

  <div class="hs-tags">
    <div class="hs-tagsHead">
      <i class="hs-tagIcon"
        @click="saveJson()"
      ></i>
      <span>Tags</span>
    </div>
    <ul class="hs-tagsList">
      <li v-for="tag in tags" :key="tag"
        @click="confirmation(tag)"
      >{{tag}} <a></a></li>
    </ul>

    <div class="hs-inputRow">
      <input
        type="text"
        v-model="tag"
        @keyup.enter=" tag !== '' && !~tags.indexOf(tag) ? addTag() : ''"
        placeholder="Tag name"
      >
      <label
        @click=" tag !== '' && !~tags.indexOf(tag) ? addTag() : ''"
      >Add</label>
    </div>

  </div>



</div>
</template>
<script>
export default {
  name: 'Tags',
  props: ['tags','langs','questions'],
  data() {
    return {
      tag: ''
    }
  },
  methods: {
    addTag(){
      this.tags.push(this.tag)
      this.tag = ''
    },
    confirmation: function(tag){
      var tagIndex = this.tags.indexOf(tag)
      if(confirm('Are you sure you want to delete ' + tag +'?')) {
        this.langs.forEach(lang => {
          this.questions[lang].forEach(question => {
            question.answers.forEach(answer => {
              var tags = answer.tags
              ~tags.indexOf(tagIndex) ?
                answer.tags.splice(tags.indexOf(tagIndex),1) : ''
            })
          })
        })
        this.tags.splice(tagIndex, 1)
      }
    },
    saveJson(){
      var json = {
        tags: this.tags,
        question: this.questions
      }
      json = JSON.stringify(json)

    }
  },
}
</script>