import { CapsuleGeometry, Mesh, MeshStandardMaterial } from "three";

function createCapsule(scene) {
  const geometry = new CapsuleGeometry(1, 2, 4, 8);
  const material = new MeshStandardMaterial({ color: 0xffff00 });
  const capsule = new Mesh(geometry, material);

  capsule.castShadow = true;

  scene.add(capsule);

  capsule.position.y = 1;

  return capsule;
}

export default createCapsule;
