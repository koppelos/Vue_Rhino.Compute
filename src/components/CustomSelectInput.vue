<template>
    <div class="select-input">
      <label>{{ title }}</label>
      <select v-model="localValue" @change="updateValue">
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    title: String,
    options: Array,
    val: [String, Number]
  })
  
  const emit = defineEmits(['update'])
  
  const localValue = ref(props.val)
  
  watch(() => props.val, (newVal) => {
    localValue.value = newVal
  })
  
  function updateValue() {
    emit('update', localValue.value)
  }
  </script>
  
  <style scoped>
  .select-input {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
  
  .select-input label {
    margin-bottom: 5px;
  }
  </style>
  