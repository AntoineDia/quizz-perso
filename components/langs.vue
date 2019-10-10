<template>
<div id="hs-langsComponent">

  <div
    class="hs-translation"
    title="Toggle the translation mode"
    @click="toggleTranslationMode()"
  >
    <div
      :class="{ 'hs-disabled': currentLangs.length !== langs.length }"
    >
      <i class="hs-translationIcon"></i>
      <span class="hs-borderBottom"></span>
    </div>
  </div>

  <ul
    class="hs-langs"
  >
    <li
      class="hs-langItem"
      v-for="lang in langs" :key="lang"
      :style="{ backgroundImage : getIcon(lang) }"
      :class="{ 'hs-disabled' : !~currentLangs.indexOf(lang)}"
      @click="chooseLang($event,lang)"
    >
      <span class="hs-langText">{{lang}}</span>
    </li>
  </ul>

</div>
</template>
<script>
import iconsLangs from './icons-langs'
export default {
  name: 'Langs',
  props: ['langs'],
  data: function(){
    return {
      currentLangs: []
    }
  },
  created: function(){
    this.currentLangs = this.langs.slice()
  },
  watch: {
    currentLangs: function(){
      this.$emit('update', this.currentLangs)
    }
  },
  methods: {
    getIcon: function(lang,style){
      return 'url(' + iconsLangs[lang] + ')'
    },
    toggleTranslationMode: function(){
      if(this.currentLangs.length === this.langs.length)
        return this.currentLangs = [this.langs[0]]
      this.currentLangs = this.langs.slice()
    },
    chooseLang(ev, lang){
      if(ev.ctrlKey)
        ~this.currentLangs.indexOf(lang) ?
          this.currentLangs.splice(this.currentLangs.indexOf(lang),1) :
          this.currentLangs.push(lang)
      else this.currentLangs = [lang]
    }
  },
}
</script>