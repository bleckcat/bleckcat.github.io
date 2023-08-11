import * as THREE from "three";
import createGroundPlane from "./utils/ground";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CharacterControls } from "./utils/characterControls";

// MODELS
import backgroundBall from "/assets/fantasy_sky_background/scene.gltf";
import toonCat from "/assets/toon_cat/scene.gltf";

function renderThreeJs(element) {
  // CANVAS
  const canvas = element;
  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xabcdef);
  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    depthBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    2000
  );
  // CONTROLS
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 5;
  orbitControls.maxDistance = 15;
  orbitControls.enablePan = false;
  orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
  orbitControls.update();

  // CONSTS
  const loader = new GLTFLoader();
  const clock = new THREE.Clock();
  const ambientLight = new THREE.AmbientLight(0xadd8e6, 3);

  //SKY
  loader.load(backgroundBall, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "background_mesh") {
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(
            "assets/fantasy_sky_background/textures/Sky_background_emissive.jpeg"
          );
          const material = new THREE.MeshStandardMaterial({ map: texture });
          material.flatShading = true;
          child.material = material;
        }
      }
    });

    model.scale.set(13, 13, 13);
  });

  loader.load(toonCat, function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
    });
    scene.add(model);

    const gltfAnimations = gltf.animations;
    console.log(gltfAnimations);
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap = new Map();
    gltfAnimations
      .filter((a) => a.name != "TPose")
      .forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
      });

    characterControls = new CharacterControls(
      model,
      mixer,
      animationsMap,
      orbitControls,
      camera,
      "Idle"
    );

    model.scale.set(0.001, 0.001, 0.001);
  });

  createGroundPlane(scene);

  var characterControls;

  // CONTROL KEYS
  const keysPressed = {};
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle();
      } else {
        keysPressed[event.key.toLowerCase()] = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    },
    false
  );

  // ANIMATE
  function animate() {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
      characterControls.update(mixerUpdateDelta, keysPressed);
    }
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  document.body.appendChild(renderer.domElement);
  animate();

  scene.add(ambientLight);

  // RESIZE HANDLER
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize);
}

export default renderThreeJs;
