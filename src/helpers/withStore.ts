import { Store } from "../core/Store";
import { ComponentClass } from "../core";


type MapStateToProps = (store: Store<AppState>) => Partial<AppState>;
type MapDispatchToProps = (store: Store<AppState>) => any;
export function withStore(WrappedBlock: ComponentClass<any>) {

  // @ts-expect-error No base constructor has the specified
  return (mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) => class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      super({ ...props, ...mapStateToProps(window.store), ...(mapDispatchToProps ? mapDispatchToProps(window.store) : null) });
    }

    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error не подтягивается типизация Component
      this.setProps({ ...this.props, ...mapStateToProps(window.store) });
    };

    componentDidMount(props: any) {
      super.componentDidMount(props);
      window.store.on("changed", this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off("changed", this.__onChangeStoreCallback);
    }

  } as ComponentClass<any>;
}
