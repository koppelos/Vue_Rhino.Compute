<template>
    <div id="viewport">
      <!-- To this element we will append our 3d scene. -->
      <div id="threejs-container"></div>
  
    </div>
  </template>
  
  <script setup>
  // Imports;
  import { onMounted, onUpdated, watch, onUnmounted } from 'vue'
  import * as THREE from "three"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { Rhino3dmLoader } from "three/addons/loaders/3DMLoader.js"
  import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
  import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
  import { runCompute } from "@/scripts/compute.js"
  import { loadRhino } from "@/scripts/compute.js";
  
  import texturePath from "../assets/graphics/brick_texture.jpg"
  
  //import context from "../assets/
  import context from "../assets/lilienstein_4k.hdr"
  
  const ghPath = '../assets/disco.gh'
  
  const loader = new Rhino3dmLoader()
  loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/')
  
  
  const props = defineProps(["data", "path", "runCompute"]);
  const emits = defineEmits(["updateMetadata"]);  
  
  
  watch(() => props.data, (newValue) => {
    if (newValue) {
      compute();
    }
  }, {deep: true})
  
  
  // Three js objects
  let renderer, camera, scene,  controls, container, gui
  let mirrorMaterial, blackMaterial
  let spotLightRed, spotLightBlue, spotLightGreen, spotLightOrange
  
  
  function init() {
  
    //Define container to put three.js scene in
    container = document.getElementById("threejs-container")
  
    // Set up renderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8
  
    // We are taking element defined in <template> and appending our render to it. 
    container.appendChild(renderer.domElement)
  
    // Set up camera - https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 5000 );
      camera.position.set(800, 250, 200)
    camera.lookAt(0,0,0)
  
    // Create scene - https://threejs.org/docs/?q=scene#api/en/scenes/Scene
    scene = new THREE.Scene()
    scene.rotation.y = 0.5;
  
    // orbit controls - https://threejs.org/docs/#examples/en/controls/OrbitControls
    controls = new OrbitControls(camera, renderer.domElement)
  
    // Ambient Light
    const ambientlight = new THREE.AmbientLight(0xffffff, 1)
    ambientlight.position.set(0, 0, 0)
  
    //Colored Spot Lights
    spotLightRed = new THREE.SpotLight( 0xff0040, 400 );
    spotLightRed.position.set( 100, 0, 0);
    scene.add( spotLightRed );
  
    spotLightBlue = new THREE.SpotLight( 0x0040ff, 400 );
    spotLightBlue.position.set( 0, 100, 0);
    scene.add( spotLightBlue );
  
    spotLightGreen = new THREE.SpotLight( 0x80ff80, 400 );
    spotLightGreen.position.set( -100, 0, 0);
    scene.add( spotLightGreen );
  
    spotLightOrange = new THREE.SpotLight( 0xffaa00, 400 );
    spotLightOrange.position.set( 0, -100, -100);
    scene.add( spotLightOrange );
  
    //Create Materials
    mirrorMaterial = new THREE.MeshStandardMaterial( {
      roughness: 0.85,
      metalness: 0.85,
      flatShading: false
    });
  
    blackMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } ); 
  
    //Load 360 Image for background and envMap
    new RGBELoader().load(context, function (texture){
      texture.mapping = THREE.EquirectangularReflectionMapping;
      mirrorMaterial.envMap = texture
      scene.background = texture;
    })
  
    //Add THREE.js GUI to modify material properties
    gui = new GUI();
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '95px';
    gui.domElement.style.right = '20px'
    gui.add( mirrorMaterial, 'roughness', 0, 1 );
    gui.add( mirrorMaterial, 'metalness', 0, 1 );
    gui.add( renderer, 'toneMappingExposure', 0, 2 ).name( 'exposure' );
  
    //Rotate scene
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;
  
    //Animate
    animate()
  }
  
  
  // this function runs Compute
  async function compute() {
    console.log("Runnning compute... \ndata sent: ", props.data)
    const doc = await runCompute(props.data, props.path)
  
    if (doc.metadata) {
      emits("updateMetadata", doc.metadata);
    }
  
    // clear objects from scene
    let objectsToRemove = []
    scene.children.forEach(child => {
      if (!child.type.toLowerCase().includes("light")) {
        objectsToRemove.push(child)
      }
    })
    objectsToRemove.forEach(object => {
      scene.remove(object)
    })
  
    // add object graph from rhino model to three.js scene
    const buffer = new Uint8Array(doc.toByteArray()).buffer;
    loader.parse(buffer, function (object) {
      object.traverse((child) => {
        if (child.isMesh){
          if (child.userData.attributes.userStrings && child.userData.attributes.userStrings[0][1] == 'sphere'){
            child.material = blackMaterial
          }
          else {
            child.material = mirrorMaterial
            child.castShadow = true; 
            child.receiveShadow = true;
          }
        }
      })
  
      scene.add(object)
      console.log("Compute done")
    });
  }
  
  
  
  // for controls update
  function animate() {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // native Javascript function that tells your browser you are animating!
    requestAnimationFrame(animate);
    controls.update();
  
    const speedFactor = 0.001; // lower values for slower rotation, higher values for faster rotation
    const speedElementRotation = 0.00001;
  
    // Rotate the element
    scene.rotation.y += speedElementRotation; // Add this line to rotate the scene
  
  
  
  /*
    //Rotate Lights
    const time = Date.now() * speedFactor;
    spotLightRed.position.x = Math.sin( time * 0.7 ) * 100;
    spotLightRed.position.y = Math.cos( time * 0.5 ) * 100;
    spotLightRed.position.z = Math.cos( time * 0.3 ) * 100;
  
    spotLightBlue.position.x = Math.cos( time * 0.3 ) * 100;
    spotLightBlue.position.y = Math.sin( time * 0.5 ) * 100;
    spotLightBlue.position.z = Math.sin( time * 0.7 ) * 100;
  
    spotLightGreen.position.x = Math.sin( time * 0.7 ) * 100;
    spotLightGreen.position.y = Math.cos( time * 0.3 ) * 100;
    spotLightGreen.position.z = Math.sin( time * 0.5 ) * 100;
  
    spotLightOrange.position.x = Math.sin( time * 0.3 ) * 100;
    spotLightOrange.position.y = Math.cos( time * 0.7 ) * 100;
    spotLightOrange.position.z = Math.sin( time * 0.5 ) * 100;
  */
  
    renderer.render(scene, camera);
  }
  
  // This will be run whenever the window is resized
  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
  
    const height = container.offsetHeight
    const width = container.offsetWidth
  
    camera.aspect = width/ height
    camera.updateProjectionMatrix();
  
  
    renderer.setSize(width, height)
  
  }
  
  // This will be run whenever this component is instantiated
  onMounted(async() => {
    init()
    await loadRhino()
    compute();
  })
  
  //remove three.js gui panel when the component is unmounted
  onUnmounted(async() => {
    gui.destroy()
  })
  
  
  </script>
  
  <style scoped>
#viewport {
  height: 100%; /* Adjust the height as needed */
  width: 100%; /* Adjust the width as needed */
  display: flex;
  flex-direction: column;
  position: relative;
}

#threejs-container {
  height: 50vh; /* Adjust as needed */
  width: 50vw; /* Adjust as needed */
  position: absolute; /* Allows you to control the exact position */
  top: 10%; /* Adjust as needed */
  left: 10%; /* Adjust as needed */
  right: auto;
  bottom: auto;
  margin: center;
}
  
  #gui {
    position: absolute;
    top: 2px;
    left: 2px;
  }
  </style>