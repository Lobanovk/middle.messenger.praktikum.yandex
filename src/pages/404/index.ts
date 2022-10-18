import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import {ErrorPage404} from "./404";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ErrorPage404())
})

