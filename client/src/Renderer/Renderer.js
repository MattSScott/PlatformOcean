import React from "react";
import Button from "@mui/material/Button";
// import PluginStacker from "../ImportUtils/PluginStacker";
import "./Renderer.css";
import { ClientDataContext } from "../Contexts/ClientContext";

class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.triggerLogout = this.triggerLogout.bind(this);
  }

  triggerLogout() {
    this.props.setClientInfo(null);
    localStorage.clear();
  }

  render() {
    return (
      <>
        <div className="logout">
          <ClientDataContext.Consumer>
            {({ clientID }) => (
              <p>Signed in as: {`${clientID.substring(0, 8)}...`}</p>
            )}
          </ClientDataContext.Consumer>
          <Button variant="contained" onClick={this.triggerLogout}>
            Logout
          </Button>
        </div>
        <div className="allComps">{this.props.loadedPlugins}</div>
      </>
    );
  }
}

export default Renderer;
