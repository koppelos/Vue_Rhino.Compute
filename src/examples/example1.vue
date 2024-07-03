<template>
  <div id="container">
    <div id="topbar">
      <Slider :title="radiusSliderName" :min="1" max="100" :step="1" :val="radiusSliderValue" @update="updateValue"></Slider>
      <Slider :title="divisionsVertSliderName" :min="1" max="30" :step="1" :val="divisionsVertValue" @update="updateValue"></Slider>
      <Slider :title="horzDivisionWidthSliderName" :min="1" max="10" :step="1" :val="horzDivisionWidthValue" @update="updateValue"></Slider>
      <Toggle :title="makeSpikeyToggleName" :val="makeSpikeyToggleValue" @update="updateValue"></Toggle>
    </div>

    <div id="viewer">
      <GeometryView :data="inputs" :path="path"></GeometryView>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue"
import GeometryView from "../components/GeometryView.vue"
import Slider from '../components/Slider.vue'
import Toggle from "../components/Toggle.vue"

//define path to grasshopper script
import def from "../assets/disco.gh"
const path = def
//comment
//define input names and values
const radiusSliderName = ref("radius")
const radiusSliderValue = ref(50)

const divisionsVertSliderName = ref("divisionsVert")
const divisionsVertValue = ref(20)

const horzDivisionWidthSliderName = ref("horzDivisionWidth")
const horzDivisionWidthValue = ref(4)

const makeSpikeyToggleName = ref("makeSpikey")
const makeSpikeyToggleValue = ref(false)

//define inputs
let inputs = ref({
  [radiusSliderName.value]: radiusSliderValue.value ,
  [divisionsVertSliderName.value] : divisionsVertValue.value ,
  [horzDivisionWidthSliderName.value] : horzDivisionWidthValue.value,
  [makeSpikeyToggleName.value] : makeSpikeyToggleValue.value
});

function updateValue(newValue, parameterName) {
  // Iterate over the inputs array
  for (const [key, value] of Object.entries(inputs.value)) {
    if (key == parameterName){
        inputs.value[key] = newValue
        console.log(parameterName + ':' + newValue)
    }
  }
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
