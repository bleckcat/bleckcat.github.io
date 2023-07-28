import "./style.css";
import setupThree from "./three";

document.querySelector("#app").innerHTML = `
  <canvas class="webgl">
  </canvas>
`;

setupThree(document.querySelector(".webgl"));
