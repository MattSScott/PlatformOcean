import React, { lazy } from "react";
import PluginStacker from "./PluginStacker";
import RemoteComponent from "../remoteImporterUtils/RemoteComponent";
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

    // async importPlugin(plugin) {
    //   return lazy(() =>
    //     import(`../plugins/${plugin}/${plugin}`).catch(() =>
    //       import("../NullView/NullView")
    //     )
    //   );
    // }

    setPlugins(pluginsReturned) {
      const PluginMapping = {};
      for (const { name, plugin, key } of pluginsReturned) {
        if (name in PluginMapping) {
          PluginMapping[name].push({ plugin: plugin, key: key });
        } else {
          PluginMapping[name] = [{ plugin: plugin, key: key }];
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

    // async loadPlugins(pluginNames) {
    //   const componentPromises = Object.entries(pluginNames).map(
    //     async ([pluginKey, pluginName]) => {
    //       try {
    //         const Plugin = await this.importPlugin(pluginName);
    //         return { name: pluginName, plugin: Plugin, key: pluginKey };
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   );
    //   Promise.all(componentPromises).then(this.setPlugins);
    // }

    loadPlugins(pluginData) {
      const components = Object.entries(pluginData).map(
        ([pluginKey, pluginName, pluginUrl]) => {
          const Plugin = (
            <RemoteComponent
              remoteUrl={pluginUrl}
              scope={"PLUGIN"}
              module={"./Plugin"}
            />
          );
          return { name: pluginName, plugin: Plugin, key: pluginKey };
        }
      );
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
