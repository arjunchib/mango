import { wrapArrayIfNeeded } from "../helpers";

export class Fragment {
  constructor(
    private props: {
      children: any[];
    }
  ) {}

  render() {
    const { children } = this.props;
    return children;
  }
}
