<template>
    <button @click="openThreeJsWindow">Click Me</button>
  </template>
  
  <script setup>
  function openThreeJsWindow() {
    window.open('/threejs-scene.html', '_blank', 'width=800,height=600');
  }
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  