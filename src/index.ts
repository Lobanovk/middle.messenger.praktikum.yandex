import { renderDOM } from "core";
import registerComponents from "helpers/registerComponents";
import { PageType, Profile } from "./pages_v1/profile/profile";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Profile({ type: PageType.DEFAULT}));
});

