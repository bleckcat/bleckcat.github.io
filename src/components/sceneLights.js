import { AmbientLight, DirectionalLight } from "three";

function sceneLights(scene) {
  const ambientLight = new AmbientLight(0xffffff, 0.5);

  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 0.8);

  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;

  scene.add(directionalLight);

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 50;
}

export default sceneLights;
