import React from "react";

class PluginSetUpdater extends React.Component {
  state = {
    pluginMap: null,
    missingPlugins: null,
  };

  componentDidMount() {
    this.checkPluginSet();
    // this.pluginCommunication();
  }

  checkPluginSet() {
    let pluginMapRetrieve = localStorage.getItem("pluginMap");
    if (!pluginMapRetrieve) {
      pluginMapRetrieve = JSON.stringify({
        "2b05b25d-699a-4472-b22c-0d2bfe211308": "Subtitler",
      });
      localStorage.setItem("pluginMap", pluginMapRetrieve);
    }
    this.setState(
      (prevState) => ({
        ...prevState,
        pluginMap: pluginMapRetrieve,
      }),
      this.pluginCommunication
    );
  }

  async pluginCommunication() {
    const PluginCheckSendAddress = `http://localhost:8080/pluginCheck/${this.props.clientID}`;

    const pluginDiffRaw = await fetch(PluginCheckSendAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: this.state.pluginMap,
    });

    const pluginDiff = await pluginDiffRaw.json();
    this.setState((prevState) => ({
      ...prevState,
      missingPlugins: pluginDiff,
    }));
  }

  render() {
    return (
      this.state.missingPlugins && <p>You are missing the newest plugins</p>
    );
  }
}

export default PluginSetUpdater;
