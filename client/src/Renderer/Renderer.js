import React from "react";
import Button from "@mui/material/Button";

import "./Renderer.css";

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
          <p>Signed in as: {`${this.props.clientID.substring(0, 8)}...`}</p>
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
