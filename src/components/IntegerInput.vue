<template>
    <div>
      <form class="definition-input">
        <label class="input-title" for="float-input">{{ title }}: {{ inputValue }}</label>
        <input
          type="number"
          step="0.01"
          v-model="inputValue"
          @input="emitValueUpdate"
        />
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps(['title', 'val']);
  const emits = defineEmits(['update']);
  const inputValue = ref(props.val);
  
  watch(() => props.val, (newVal) => {
    inputValue.value = newVal;
  });
  
  function emitValueUpdate() {
    const value = inputValue.value !== '' ? Math.round(parseFloat(inputValue.value)) : 1;
    emits("update", value, props.title);
  }
  </script>









  
  <style scoped>
  .definition-input {
    margin: 10px 0;
  }
  
  .input-title {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="number"] {
    width: 100px;
    padding: 5px;
  }
  </style>
