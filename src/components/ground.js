import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createGroundPlane(scene) {
  const geometry = new BoxGeometry(20, 0, 20);
  const material = new MeshStandardMaterial({ color: 0x00ff00 });
  const plane = new Mesh(geometry, material);

  plane.receiveShadow = true;

  scene.add(plane);

  plane.position.y = -1;

  return plane;
}

export default createGroundPlane;
