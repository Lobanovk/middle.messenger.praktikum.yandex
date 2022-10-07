import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import { ErrorPage500 } from "./500";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ErrorPage500())
})

