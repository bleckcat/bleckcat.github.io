import * as THREE from "three";
import createGroundPlane from "./components/ground";
import createCapsule from "./components/createCapsule";
import sceneLights from "./components/sceneLights";
import sceneCameraConfig from "./components/sceneCamera";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import backgroundBall from "/assets/fantasy_sky_background/scene.gltf";
import catModel from "/assets/behemot_cat/scene.gltf";

function setupThree(element) {
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

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  const ground = createGroundPlane(scene);

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

  loader.load(catModel, (gltf) => {
    const model = gltf.scene;

    scene.add(model);

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "background_mesh") {
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(
            "assets/fantasy_sky_background/textures/Cat_Material_baseColor.png"
          );
          const material = new THREE.MeshStandardMaterial({ map: texture });
          child.material = material;
        }
      }
    });

    // model.scale.set(13, 13, 13);
    model.position.set(0, -1, 0);
  });

  sceneLights(scene);
  sceneCameraConfig(camera, scene, renderer, ground);
}

export default setupThree;
