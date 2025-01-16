import React from "react";
import PluginStacker from "./PluginStacker";
import RemotePluginPipeline from "./RemotePluginPipeline";

export default function PluginImporter(ChildComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setPlugins = this.setPlugins.bind(this);
      this.baseURL = process.env.REACT_APP_FILE_SERVER_ADDRESS;
    }

    state = {
      loadedPlugins: [],
    };

    componentDidMount() {
      this.loadPlugins(this.props.pluginDescriptors);
    }

    setPlugins(pluginsReturned) {
      const PluginMapping = {};
      for (const { name, plugin } of pluginsReturned) {
        if (name in PluginMapping) {
          PluginMapping[name].push(plugin);
        } else {
          PluginMapping[name] = [plugin];
        }
      }

      const PluginStackerArray = Object.values(PluginMapping).map(
        (pluginKeyPair, idx) => (
          <PluginStacker plugins={pluginKeyPair} key={`stacker-${idx}`} />
        )
      );

      this.setState((prevState) => ({
        ...prevState,
        loadedPlugins: PluginStackerArray,
      }));
    }

    loadPlugins(pluginData) {
      const components = pluginData.map(({ pluginKey, pluginName }) => {
        const pluginURL = `${this.baseURL}/plugins/${pluginName}`;
        console.log(pluginURL);
        const Plugin = (
          <RemotePluginPipeline
            remoteUrl={pluginURL}
            scope={"PLUGIN"}
            module={"./Plugin"}
            pluginKey={pluginKey}
          />
        );
        return {
          name: pluginName,
          plugin: Plugin,
        };
      });
      this.setPlugins(components);
    }

    render() {
      return (
        <ChildComponent
          {...this.props}
          loadedPlugins={this.state.loadedPlugins}
        />
      );
    }
  };
}
