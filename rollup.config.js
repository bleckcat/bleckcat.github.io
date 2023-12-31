import gltf from "rollup-plugin-gltf";

export default {
  entry: "src/index.js",
  dest: "dist/js/bundle.js",
  plugins: [
    gltf({
      include: "**/*.gltf",
      exclude: "artwork/*.gltf",
      inline: false,
    }),
  ],
};
