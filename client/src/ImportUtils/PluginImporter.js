import React, { lazy } from "react";
import PluginStacker from "./PluginStacker";
// import DataOperator from "./DataOperator";

export default function PluginImporter(ChildComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setPlugins = this.setPlugins.bind(this);
    }

    state = {
      loadedPlugins: [],
    };

    componentDidMount() {
      this.loadPlugins(this.props.pluginDescriptors);
    }

    async importPlugin(plugin) {
      return lazy(() =>
        import(`../plugins/${plugin}/${plugin}`).catch(() =>
          import("../NullView/NullView")
        )
      );
    }

    setPlugins(pluginsReturned) {
      console.log(pluginsReturned);
      const PluginMapping = {};
      for (const { name, plugin, key } of pluginsReturned) {
        if (name in PluginMapping) {
          PluginMapping[name].push({ plugin: plugin, key: key });
        } else {
          PluginMapping[name] = [{ plugin: plugin, key: key }];
        }
      }

      console.log(PluginMapping);

      const PluginStackerArray = Object.values(PluginMapping).map(
        (pluginKeyPair) => {
          return <PluginStacker plugins={pluginKeyPair} />;
        }
      );

      console.log(PluginStackerArray);

      this.setState(
        (prevState) => ({
          ...prevState,
          loadedPlugins: PluginStackerArray,
        }),
        () => {
          console.log(this.state.loadedPlugins);
        }
      );
    }

    // async loadPlugins(pluginNames) {
    //   const componentPromises = Object.entries(pluginNames).map(
    //     async ([pluginKey, pluginName]) => {
    //       try {
    //         const Plugin = await this.importPlugin(pluginName);
    //         const EnhancedPlugin = DataOperator(Plugin);
    //         return (
    //           <div className="componentHouse" key={pluginKey}>
    //             <EnhancedPlugin
    //               client={this.props.client}
    //               routingKey={pluginKey}
    //               uniqueClientID={this.props.clientID}
    //             />
    //           </div>
    //         );
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   );
    //   Promise.all(componentPromises).then(this.setPlugins);
    // }

    async loadPlugins(pluginNames) {
      const componentPromises = Object.entries(pluginNames).map(
        async ([pluginKey, pluginName]) => {
          try {
            const Plugin = await this.importPlugin(pluginName);
            return { name: pluginName, plugin: Plugin, key: pluginKey };
          } catch (error) {
            console.log(error);
          }
        }
      );
      Promise.all(componentPromises).then(this.setPlugins);
    }

    render() {
      console.log(this.state.loadedPlugins);
      return (
        <ChildComponent
          {...this.props}
          loadedPlugins={this.state.loadedPlugins}
        />
      );
    }
  };
}
