import { renderDOM } from "core";
import registerComponents from "helpers/registerComponents";
import ErrorPage from "./pages_v1/error-page";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ErrorPage({
    type: "404",
    title: "404",
    description: "Не туда попали",
    link: {
      text: "Назад к чатам",
      href: "/chat.html"
    }
  }));
});

