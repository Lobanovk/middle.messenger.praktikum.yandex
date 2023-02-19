import { ComponentClass } from "../core";
import { withStore } from "./withStore";
import { getToken } from "../services/chats";
import webSocketTransport from "../core/WebSocketTransport";

type WithRouterProps = { [key: string]: any }
export function withWebSocket<P extends WithRouterProps>(WrappedBlock: ComponentClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return withStore(class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: any) {
      super({ ...(props || {}) });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      // props.getToken();
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      // @ts-expect-error Property 'props' does not exist on type '(Anonymous class)'.
      webSocketTransport.closeConnection(this.props.clearMessages);
    }

  } as ComponentClass<P>)(() => ({}),
    store => ({
      // getToken: () => store.dispatch(getToken),
      clearMessages: () => store.dispatch({ messages: [] }),
    }));
}
