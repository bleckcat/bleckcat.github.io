import * as THREE from "three";
import createGroundPlane from "./components/ground";
import createCapsule from "./components/createCapsule";
import sceneLights from "./components/sceneLights";
import sceneCamera from "./components/sceneCamera";

function setupThree(element) {
  const canvas = element;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xabcdef);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  createGroundPlane(scene);

  const capsule = createCapsule(scene);

  sceneLights(scene);

  sceneCamera(scene, renderer, capsule);
}

export default setupThree;
