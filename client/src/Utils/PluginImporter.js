import React, { lazy } from "react";
import DataOperator from "./DataOperator";

export default function PluginImporter(ChildComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setPlugins = this.setPlugins.bind(this);
    }

    state = {
      loadedPlugins: null,
    };

    componentDidMount() {
      const plugins = ["Coords", "Message", "Subtitler"];
      this.loadPlugins(plugins);
    }

    async importPlugin(plugin) {
      return lazy(() =>
        import(`../Components/${plugin}/${plugin}`).catch((err) =>
          console.log(err)
        )
      );
    }

    setPlugins(pluginsReturned) {
      this.setState((prevState) => ({
        ...prevState,
        loadedPlugins: pluginsReturned,
      }));
    }

    async loadPlugins(pluginNames) {
      const componentPromises = pluginNames.map(async (plugin, ind) => {
        const Plugin = await this.importPlugin(plugin);
        const EnhancedPlugin = DataOperator(Plugin);
        return (
          <div className="componentHouse" key={this.props.pluginKeys[ind]}>
            <EnhancedPlugin
              client={this.props.client}
              routingKey={this.props.pluginKeys[ind]}
              uniqueClientID={this.props.clientID}
            />
          </div>
        );
      });
      Promise.all(componentPromises).then(this.setPlugins);
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
