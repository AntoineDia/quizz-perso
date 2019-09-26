<template>
<div>
  <button class="edit expand"></button>
  <button class="edit translation"></button>
  <button class="edit delete"></button>
</div>
</template>

<script>
export default {
  name: 'Questions',
  props: ['questions']
}
</script>
<style>
.edit{
  height: 50px; width: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
  background-size: contain;
  margin: 0 2px;
}
.edit:hover{
  transform: scale(1.1)
}
.translation{ background-image: url('https://img.icons8.com/metro/48/2266EE/translation.png') }
.expand{ background-image: url('https://img.icons8.com/metro/48/0B0C0C/resize-diagonal.png') }
.delete{ background-image: url('https://img.icons8.com/metro/48/db3254/trash.png')}
</style>