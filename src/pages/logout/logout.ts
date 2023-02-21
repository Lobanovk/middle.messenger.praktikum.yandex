import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { logout } from "../../services/auth";
import { Store } from "../../core/Store";

type PageProps = {
  logout: () => Store<AppState>;
}
class Logout extends Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  componentDidMount() {
    this.props.logout();
  }

  protected render(): string {
    return "<div></div>";
  }
}

export default withStore(Logout)(() => ({}), (store) => ({
  logout: () => store.dispatch(logout)
}));
