import { Object3D, PerspectiveCamera, Spherical } from "three";

function sceneCamera(scene, renderer, pivotPosition) {
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const cameraPivot = new Object3D();
  const distance = 30;
  const spherical = new Spherical(distance, Math.PI / 2, 0);

  cameraPivot.position.setFromSpherical(spherical).add(pivotPosition.position);
  camera.lookAt(pivotPosition.position);
  cameraPivot.add(camera);
  scene.add(cameraPivot);

  let mouseX = 0;

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  }

  window.addEventListener("mousemove", onMouseMove);
  camera.position.y += 7;

  function cameraMovement() {
    requestAnimationFrame(cameraMovement);
    spherical.theta -= mouseX * 0.02;
    cameraPivot.position
      .setFromSpherical(spherical)
      .add(pivotPosition.position);
    camera.lookAt(pivotPosition.position);
    renderer.render(scene, camera);
  }

  cameraMovement();
}

export default sceneCamera;
