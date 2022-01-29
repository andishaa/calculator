import { UIRenderer } from "./calculatorUI.js";

function init() {
    const calculatorContainer = document.querySelector("body main");
    const renderer = new UIRenderer(calculatorContainer);
    renderer.initialRender();
}

init();