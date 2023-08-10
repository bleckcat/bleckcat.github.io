import "./style.css";
import renderThreeJs from "./three";

document.querySelector("#app").innerHTML = `
  <canvas class="webgl">
  </canvas>
`;

renderThreeJs(document.querySelector(".webgl"));
