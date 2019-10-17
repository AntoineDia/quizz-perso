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
  props: ['tags','langs','questions','tagByid'],
  data() {
    return {
      tag: '',
      nextTagId : 2,
    }
  },
  watch: {
    tags(){
      this.tags.forEach(function(tag){
        var found = this.tagByid.find(function(tagObj){
          return tag === tagObj.name
        }.bind(this))
        if(!found){
          this.tagByid.forEach(function(tagObj){
            this.nextTagId <= tagObj.id ?
              this.nextTagId = tagObj.id + 1 : ''
          }.bind(this),0)
          this.tagByid.push({
            id: this.nextTagId,
            name: tag
          })
        }
      }.bind(this))
      this.tagByid.forEach(function(tagObj,i){
        var found = this.tags.find(function(tag){
          return tag === tagObj.name
        })
        if(!found){
          this.tagByid.splice(i,1)
        }
      }.bind(this))
      this.$emit('tag-update',this.tagByid)
    }
  },
  methods: {
    addTag(){
      this.tags.push(this.tag)
      this.tag = ''
    },
    confirmation: function(tag){
      if(confirm('Are you sure you want to delete ' + tag +'?')) {
        var tagIndex = this.tagByid.find(function(tagObj){
          return tag === tagObj.name
        })
        tagIndex = tagIndex.id
        this.langs.forEach(lang => {
          this.questions[lang].forEach(question => {
            question.answers.forEach(answer => {
              var tags = answer.tags
              console.log(tags, tags.indexOf(tagIndex))
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
      console.log(json)
    }
  },
}
  </script>