// let mixer; // Declare the mixer variable in the outer scope

// loader.load("src/models/phoenix_bird/phoenix.gltf", (gltf) => {
//   const model = gltf.scene;
//   scene.add(model);
//   model.traverse((child) => {
//     if (child.isMesh) {
//       if (child.geometry.isBufferGeometry) {
//         // Compute vertex normals for BufferGeometry
//         child.geometry.computeVertexNormals();
//       } else {
//         // Compute vertex normals for Geometry (deprecated)
//         child.geometry.computeFaceNormals();
//         child.geometry.computeVertexNormals();
//       }
//       if (child.material.map) {
//         child.material.map.needsUpdate = true;
//         child.material.side = THREE.DoubleSide;
//       }
//     }
//   });

//   if (gltf.animations && gltf.animations.length > 0) {
//     mixer = new THREE.AnimationMixer(model);
//     const action = mixer.clipAction(gltf.animations[0]);
//     action.time = 2; // Start at 2 seconds
//     action.setLoop(THREE.LoopOnce);
//     action.play();
//   }

//   model.scale.set(0.02, 0.02, 0.02);
//   model.position.set(0, 1, 0);

//   flyingBird();
// });

// function flyingBird() {
//   requestAnimationFrame(flyingBird);

//   if (mixer) {
//     mixer.update();
//   }

//   renderer.render(scene, camera);
// }
