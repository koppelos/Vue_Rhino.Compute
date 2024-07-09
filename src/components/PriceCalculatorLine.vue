<template>
    <div class="price-calculator-line">
      <CustomIntegerInput :title="'Width'" :val="width" @update="updateField('width', $event)" />
      <CustomIntegerInput :title="'Height'" :val="height" @update="updateField('height', $event)" />
      <CustomSelectInput :title="'Panel Type'" :options="panelTypeOptions" :val="panelType" @update="updateField('panelType', $event)" />
      <CustomSelectInput :title="'Material'" :options="materialOptions" :val="material" @update="updateField('material', $event)" />
      <!-- Add other SelectInputs as needed -->
  
      <button @click="copyLine">Copy</button>
      <button @click="removeLine">Remove</button>
  
      <div class="price-display">Price: {{ linePrice }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import CustomIntegerInput from './CustomIntegerInput.vue'
  import CustomSelectInput from './CustomSelectInput.vue'
  import { calculatePrice as calculateLinePrice } from '../utils/calculations.js'
  
  const props = defineProps({
    id: Number,
    initialData: Object
  })
  
  const emit = defineEmits(['update', 'copy', 'remove'])
  
  const width = ref(props.initialData.width || 0)
  const height = ref(props.initialData.height || 0)
  const panelType = ref(props.initialData.panelType || '')
  const material = ref(props.initialData.material || '')
  
  const panelTypeOptions = ref([
    { label: 'Side Panel', value: 'side' },
    { label: 'Front Panel Door', value: 'front' }
  ])
  
  const materialOptions = ref([
    { label: 'Fenix Wood', value: 'fenix_wood' },
    { label: 'Fenix ABS', value: 'fenix_abs' }
  ])
  
  function updateField(field, value) {
    emit('update', { id: props.id, field, value })
  }
  
  function copyLine() {
    emit('copy', props.id)
  }
  
  function removeLine() {
    emit('remove', props.id)
  }
  
  const linePrice = computed(() => {
    return calculateLinePrice({
      width: width.value,
      height: height.value,
      panelType: panelType.value,
      material: material.value
    })
  })
  </script>
  
  <style scoped>
  .price-calculator-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .price-calculator-line .price-display {
    margin-left: 20px;
  }
  </style>
  