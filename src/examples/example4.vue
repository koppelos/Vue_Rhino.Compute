<template>
    <div id="container">
      <div id="topbar">
        <IntegerInput :title="radiusSliderName" :val="radiusSliderValue" @update="updateValue"></IntegerInput>
        <IntegerInput :title="divisionsVertSliderName" :val="divisionsVertValue" @update="updateValue"></IntegerInput>
        <SelectInput :title="horzDivisionWidthSliderName" :options="horzDivisionWidthOptions" :val="horzDivisionWidthSliderValue" @update="updateValue"></SelectInput>
      </div>
  
      <div id="viewer">
        <MultiGeometry2 :data="inputs" :path="path"></MultiGeometry2>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import MultiGeometry2 from "../components/2MultiGeometry.vue"
  import IntegerInput from "../components/IntegerInput.vue"
  import SelectInput from "../components/SelectInput.vue" // Import the new component
  
  // Define path to grasshopper script
  import def from "../assets/disco.gh"
  const path = def
  
  // Define input names and values
  const radiusSliderName = ref("radius")
  const radiusSliderValue = ref(20)
  
  const divisionsVertSliderName = ref("divisionsVert")
  const divisionsVertValue = ref(20)
  
  
  const horzDivisionWidthSliderName = ref("horzDivisionWidth")
  const horzDivisionWidthSliderValue = ref(1) // Initial index value as integer
  
  // Define options for the select input
  const horzDivisionWidthOptions = ref([
    { label: 'None', value: '1' },
    { label: 'TC', value: '2' },
    { label: 'TL', value: '3' },
    { label: 'TR', value: '4' }
  ])
  
  // Define inputs
  let inputs = ref({
    [radiusSliderName.value]: radiusSliderValue.value,
    [divisionsVertSliderName.value]: divisionsVertValue.value,
    [horzDivisionWidthSliderName.value]: horzDivisionWidthSliderValue.value // Initial index value as integer
  });
  
  function updateValue(newValue, parameterName) {
    // Update the specific parameter in inputs
    inputs.value[parameterName] = newValue;
    if (parameterName === horzDivisionWidthSliderName.value) {
      horzDivisionWidthSliderValue.value = newValue; // Ensure horzDivisionWidthSliderValue is updated
    }
    console.log(parameterName + ':' + newValue);
  }
  </script>
  
  
  
    
    
    
    
    
    
    
    <style scoped>
    #container {
      display: flex;
      flex-direction: column; /* Stack topbar on top of viewer */
      height: 90vh; /* Full viewport height */
      width: 80vw; /* Full viewport width */
    }
    
    #topbar {
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: space-around; /* Distribute space evenly between sliders */
      align-items: center; /* Center items vertically */
      flex-wrap: wrap; /* Allow items to wrap to the next line if necessary */
      background-color: #f8f8f8; /* Optional: Add a background color */
    }
    
    #viewer { 
      flex-grow: 1; /* Take up remaining space */
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%; /* Ensure viewer takes full width */
    }
    </style>
    