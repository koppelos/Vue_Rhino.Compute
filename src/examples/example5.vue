<template>
    <div id="container">
      <div id="topbar">
        <ButtonComponent />
      </div>
    </div>
  </template>

<script setup>

import ButtonComponent from "../components/ButtonComponent.vue";

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
