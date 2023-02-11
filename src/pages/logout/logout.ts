import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { Store } from "../../core/Store";
import { logout } from "../../services/auth";

type PageProps = {
  store: Store<AppState>;
}
class Logout extends Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  componentDidMount() {
    this.props.store.dispatch(logout);
  }

  protected render(): string {
    return "<div></div>";
  }
}

export default withStore(Logout);
