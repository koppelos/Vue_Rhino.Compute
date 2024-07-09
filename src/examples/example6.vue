<template>
    <div id="price-calculator">
      <button @click="addLine">Add Line</button>
      <div v-for="(line, index) in lines" :key="line.id">
        <PriceCalculatorLine
          :id="line.id"
          :initialData="line.data"
          @update="updateLine"
          @copy="copyLine"
          @remove="removeLine"
        />
      </div>
      <div class="total-price">Total Price: {{ calculateTotalPrice() }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import PriceCalculatorLine from '../components/PriceCalculatorLine.vue'
  import { calculatePrice } from '../utils/calculations.js'
  
  const lines = ref([])
  
  function addLine() {
    const newLine = {
      id: Date.now(),
      data: {
        width: 0,
        height: 0,
        panelType: '',
        material: ''
      }
    }
    lines.value.push(newLine)
  }
  
  function updateLine({ id, field, value }) {
    const line = lines.value.find(line => line.id === id)
    if (line) {
      line.data[field] = value
    }
  }
  
  function copyLine(id) {
    const line = lines.value.find(line => line.id === id)
    if (line) {
      const newLine = {
        id: Date.now(),
        data: { ...line.data }
      }
      lines.value.push(newLine)
    }
  }
  
  function removeLine(id) {
    lines.value = lines.value.filter(line => line.id !== id)
  }
  
  function calculateTotalPrice() {
    return lines.value.reduce((total, line) => {
      return total + parseFloat(calculatePrice(line.data))
    }, 0).toFixed(2)
  }
  </script>
  
  <style scoped>
  #price-calculator {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .total-price {
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  