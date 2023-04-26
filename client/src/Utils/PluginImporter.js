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
      this.loadPlugins(this.props.pluginDescriptors);
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
      const componentPromises = Object.entries(pluginNames).map(
        async ([pluginKey, pluginName]) => {
          const Plugin = await this.importPlugin(pluginName);
          const EnhancedPlugin = DataOperator(Plugin);
          return (
            <div className="componentHouse" key={pluginKey}>
              <EnhancedPlugin
                client={this.props.client}
                routingKey={pluginKey}
                uniqueClientID={this.props.clientID}
              />
            </div>
          );
        }
      );
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
