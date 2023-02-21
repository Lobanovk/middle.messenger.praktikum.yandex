import { Component, ComponentClass, Router } from "core";

type WithRouterProps = { [key: string]: any, router: Router };

export function withRouter<P extends WithRouterProps>(WrappedBlock: ComponentClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({...props, router: window.router});
    }
  } as Component<Omit<P, "router">>;
}
