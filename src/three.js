import * as THREE from "three";
import createGroundPlane from "./components/ground";
import createCapsule from "./components/createCapsule";
import sceneLights from "./components/sceneLights";
import sceneCameraConfig from "./components/sceneCamera";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelPath from "/assets/phoenix_bird/phoenix.gltf";

function setupThree(element) {
  const canvas = element;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xabcdef);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  // createCapsule(scene);

  const ground = createGroundPlane(scene);

  const loader = new GLTFLoader();

  let mixer; // Declare the mixer variable in the outer scope

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry.isBufferGeometry) {
          // Compute vertex normals for BufferGeometry
          child.geometry.computeVertexNormals();
        } else {
          // Compute vertex normals for Geometry (deprecated)
          child.geometry.computeFaceNormals();
          child.geometry.computeVertexNormals();
        }
        if (child.material.map) {
          child.material.map.needsUpdate = true;
          child.material.side = THREE.DoubleSide;
        }
      }
    });

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(gltf.animations[0]);
      action.time = 2; // Start at 2 seconds
      action.setLoop(THREE.LoopOnce);
      action.play();
    }

    model.scale.set(0.02, 0.02, 0.02);
    model.position.set(0, 1, 0);

    flyingBird();
  });

  function flyingBird() {
    requestAnimationFrame(flyingBird);

    if (mixer) {
      mixer.update();
    }

    renderer.render(scene, camera);
  }

  // Scene and lights
  sceneLights(scene);
  sceneCameraConfig(camera, scene, renderer, ground);
}

export default setupThree;
