export default class Router {
  private history = window.history;
  private routes: Record<string, () => void> = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

      window.onpopstate = () => this.onRouteChange.call(this);
      this.onRouteChange();
    }
  }

  onRouteChange() {
    const { pathname } = window.location;
    const found = Object.entries(this.routes)
      .some(([routePathname, callback]) => {
        if (routePathname === pathname) {
          callback();
          return true;
        }
        return false;
      });

    if (!found && this.routes["/404"]) {
      this.routes["/404"]();
    }
  }

  use(pathname: string, callback: () => void) {
    this.routes[pathname] = callback;
    return this;
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRouteChange();
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
