import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function sceneCameraConfig(camera, scene, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(25, 25, 25);

  controls.update();
}

export default sceneCameraConfig;
