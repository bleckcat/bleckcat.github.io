import * as THREE from "three";
import createGroundPlane from "./components/ground";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import backgroundBall from "/assets/fantasy_sky_background/scene.gltf";

function renderThreeJs(element) {
  const canvas = element;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xabcdef);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    depthBuffer: true,
  });

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

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const ambientLight = new THREE.AmbientLight(0xadd8e6, 3);
  createGroundPlane(scene);

  const loader = new GLTFLoader();

  loader.load(backgroundBall, (gltf) => {
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

  const clock = new THREE.Clock();

  // ANIMATE
  function animate() {
    let mixerUpdateDelta = clock.getDelta();

    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  document.body.appendChild(renderer.domElement);
  animate();

  scene.add(ambientLight);
}

export default renderThreeJs;
