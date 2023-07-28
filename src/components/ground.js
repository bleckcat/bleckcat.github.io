import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createGroundPlane(scene) {
  const geometry = new BoxGeometry(10, 0.5, 10);
  const material = new MeshStandardMaterial({ color: 0x00 });
  const plane = new Mesh(geometry, material);

  plane.receiveShadow = true;

  scene.add(plane);

  plane.position.y = -1;

  return plane;
}

export default createGroundPlane;
