import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

movement.addListener();

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(20, 20, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 1, 4, 8);
const capsuleMaterial = new THREE.MeshBasicMaterial({ color: 0xfff });
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);

movement.controls(capsule);

camera.position.z = 8;
camera.position.y = -16;

capsule.rotation.x = Math.PI / 2;
capsule.position.z = 2;

camera.rotation.x = 1;

scene.add(cube);
scene.add(capsule);

renderer.render(scene, camera);
