import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createGroundPlane(scene) {
  const geometry = new BoxGeometry(2, 0.1, 2);
  const material = new MeshStandardMaterial({ color: 0xfff });
  const plane = new Mesh(geometry, material);

  plane.receiveShadow = true;

  scene.add(plane);

  plane.position.y = -1;

  return plane;
}

export default createGroundPlane;
