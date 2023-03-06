import Component from "../Component";
import Router from "../Router";
import renderDOM from "../renderDOM";

class TestPage extends Component<{ title: string }> {
  constructor({ title }: { title: string }) {
    super({ title });
  }

  protected render(): string {
    return "<div data-test-id=\"page-content\">{{title}}</div>";
  }
}

let router: Router;
beforeEach(() => {
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);

  router = new Router();
  const page1 = new TestPage({ title: "page one" });
  const page2 = new TestPage({ title: "page two" });
  const page3 = new TestPage({ title: "page three" });
  router
    .use("/", () => renderDOM(page1))
    .use("/page2", () => renderDOM(page2))
    .use("/page3", () => renderDOM(page3));
  router.start();
});

function getElement() {
  return document.querySelector("[data-test-id=\"page-content\"]");
}

describe("Router", () => {
  it("should return page one", () => {
    const element = getElement();

    expect(element?.textContent).toBe("page one");
  });

  it("should return page two", () => {
    router.go("/page2");
    const pathname = window.location.pathname;
    const element = getElement();

    expect(pathname).toBe("/page2");
    expect(element?.textContent).toBe("page two");
  });

  it("should return page three", () => {
    router.go("/page3");
    const pathname = window.location.pathname;
    const element = getElement();

    expect(pathname).toBe("/page3");
    expect(element?.textContent).toBe("page three");
  });
});
