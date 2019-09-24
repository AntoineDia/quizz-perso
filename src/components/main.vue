<template>
  <div class='tab'>
    <label>Name</label>
    <input
      type="text"
      v-model="config.name"
      placeholder="Questionary Name"
    >
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: ['config']
}
</script>