<script setup>
import { ref, watch } from 'vue';

// Define props coming from parent component
const props = defineProps(["title", "options", "val"]);

// Local reactive variables
const title = ref(props.title);
const selectedOption = ref(parseInt(props.val)); // Default to the value passed from the parent as an integer

// Define events that will be accessible from parent component
const emits = defineEmits(["update"]);

// Watch for changes in selectedOption and emit the update with index
watch(selectedOption, (newVal) => {
  emitValueUpdate(newVal);
});

// Watch for changes in props.val to update selectedOption
watch(() => props.val, (newVal) => {
  selectedOption.value = parseInt(newVal);
});

// Function called on change
function emitValueUpdate(index) {
  emits("update", index, title.value); // Emit the index as an integer
}
</script>

<template>
  <form class="definition-input">
    <label class="input-title">{{ title }} index: {{ selectedOption }} </label>

    <select
      v-model="selectedOption"
      class="dropdown"
    >
      <option
        v-for="(option, index) in options"
        :key="option.value"
        :value="index"
      >
        {{ option.label }}
      </option>
    </select>
  </form>
</template>
