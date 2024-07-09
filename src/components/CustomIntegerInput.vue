<template>
    <div class="integer-input">
      <label>{{ title }}</label>
      <input type="number" v-model="localValue" @input="updateValue" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    title: String,
    val: Number
  })
  
  const emit = defineEmits(['update'])
  
  const localValue = ref(props.val)
  
  watch(() => props.val, (newVal) => {
    localValue.value = newVal
  })
  
  function updateValue() {
    emit('update', parseInt(localValue.value, 10))
  }
  </script>
  
  <style scoped>
  .integer-input {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
  
  .integer-input label {
    margin-bottom: 5px;
  }
  </style>
  