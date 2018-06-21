import { Component } from "react";
import { ParentClient } from "../../postmessage-client";

class Parent extends Component {
  componentDidMount() {
    this.client = new ParentClient();
  }

  componentWillUnmount() {
    this.client.close();
  }

  render() {
    const { children, render = children } = this.props;
    const { signData } = this;
    return render({ signData });
  }

  signData = data => {
    const { url, features } = this.props;

    return this.client
      .open({ url, features })
      .then(() => this.client.call("signData", [data]))
      .then(data => {
        if (data) this.client.close();
        return data;
      });
  };
}

export default { Parent };
