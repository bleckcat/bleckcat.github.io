import * as THREE from "https://unpkg.com/three@0.154.0/build/three.module.js";

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

const geometry = new THREE.BoxGeometry(20, 0.1, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const groundPlane = new THREE.Mesh(geometry, material);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
const capsuleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);

scene.add(groundPlane);

// Move the ground plane slightly down to separate it from the capsule
groundPlane.position.y = -1;

// Move the capsule upwards along the y-axis by half of its height
capsule.position.y = 1; // Half of the height of the capsule

scene.add(capsule);

const cameraPivot = new THREE.Object3D();
const distance = 30;
const spherical = new THREE.Spherical(distance, Math.PI / 2, 0); // Distance, phi (vertical angle), theta (horizontal angle)
cameraPivot.position.setFromSpherical(spherical).add(capsule.position);
camera.lookAt(groundPlane.position); // Look at the ground plane
cameraPivot.add(camera);
scene.add(cameraPivot);

let mouseX = 0;

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
}

window.addEventListener("mousemove", onMouseMove);
camera.position.y += 7;
function animate() {
  requestAnimationFrame(animate);
  spherical.theta -= mouseX * 0.02; // Adjust rotation speed
  cameraPivot.position.setFromSpherical(spherical).add(capsule.position);
  camera.lookAt(groundPlane.position); // Look at the ground plane
  renderer.render(scene, camera);
}

animate();
