import "./style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    parafuzeta
  </div>
`;

setupCounter(document.querySelector("#counter"));
