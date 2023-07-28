import * as THREE from "three";
import createGroundPlane from "./components/ground";

function setupThree(element) {
  const canvas = element;
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
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  const groundPlane = createGroundPlane(scene);

  const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
  const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  capsule.castShadow = true;

  scene.add(capsule);
  capsule.position.y = 1;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 50;

  const cameraPivot = new THREE.Object3D();
  const distance = 30;
  const spherical = new THREE.Spherical(distance, Math.PI / 2, 0);
  cameraPivot.position.setFromSpherical(spherical).add(capsule.position);
  camera.lookAt(groundPlane.position);
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
    spherical.theta -= mouseX * 0.02;
    cameraPivot.position.setFromSpherical(spherical).add(capsule.position);
    camera.lookAt(groundPlane.position);
    renderer.render(scene, camera);
  }

  animate();
}

export default setupThree;
