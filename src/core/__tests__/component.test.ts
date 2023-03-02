import Component from "../Component";
import renderDOM from "../renderDOM";

type Props = {
  counter: number;
} & ComponentEvents
class TestComponent extends Component<Props> {
  constructor() {
    super({
      counter: 0,
      events: {
        click: () => this.setProps({ counter: this.props.counter + 1 })
      }
    });
  }
  protected render(): string {
    return "<button data-test-id=\"button\">{{counter}}</button>";
  }
}

let component: Component<Props>;
beforeEach(() => {
  component = new TestComponent();
  const divEl = document.createElement("div");
  divEl.id = "root";
  document.body.appendChild(divEl);
  renderDOM(component);
});


describe("Component", () => {
  describe("initialization component", () => {
    it("should have live cycles", () => {

      expect(component.componentDidMount).toBeDefined();
      expect(component.componentDidUpdate).toBeDefined();
      expect(component.componentWillUnmount).toBeDefined();
    });
  });
  describe("render component", () => {
    it("should return element div", () => {
      const element = document.querySelector("[data-test-id=\"button\"]");

      expect((element as Element).tagName).toBe("BUTTON");
    });
    it("should return changed content", () => {
      const oldComponent = document.querySelector("[data-test-id=\"button\"]");
      (oldComponent as HTMLButtonElement).click();
      const component = document.querySelector("[data-test-id=\"button\"]");

      expect(component?.textContent).toBe("1");
    });
  });
});
