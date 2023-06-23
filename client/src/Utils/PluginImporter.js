import React, { lazy } from "react";
import DataOperator from "./DataOperator";
import { fetchPlugin } from "./PluginFetcher";
import NullView from "../NullView/NullView";

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
        import(`../plugins/${plugin}/${plugin}`).catch(() =>
          import("../NullView/NullView")
        )
      );
    }

    setPlugins(pluginsReturned) {
      this.setState((prevState) => ({
        ...prevState,
        loadedPlugins: pluginsReturned,
      }));
    }

    async assignPluginsToGlobalScope(pluginDescriptors) {
      Object.entries(pluginDescriptors).map(([pluginKey, pluginURL]) => {
        fetchPlugin(pluginKey, pluginURL);
      });
    }

    // async importAllPlugins(pluginDescriptors) {
    //   const componentSignatures = Object.keys(pluginDescriptors).map((key) => {
    //     console.log(key);
    //     const Plugin = window[key];
    //     if (Plugin) {
    //       const EnhancedPlugin = DataOperator(Plugin);
    //       return (
    //         <div className="componentHouse" key={key}>
    //           <EnhancedPlugin
    //             client={this.props.client}
    //             routingKey={key}
    //             uniqueClientID={this.props.clientID}
    //           />
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div className="componentHouse" key={key}>
    //           <NullView />
    //         </div>
    //       );
    //     }
    //   });
    //   this.setPlugins(componentSignatures);
    // }

    // loadSub() {
    //   const TestComp = window["keyCheck"];

    //   console.log("HERE:", TestComp);

    //   // const TestComp = null;
    //   const EnhancedPlugin = DataOperator(TestComp);
    //   return (
    //     <div
    //       className="componentHouse"
    //       key={"1fb14df6-7f2a-44d7-b8d8-7f6cbdb91fc5"}
    //     >
    //       <EnhancedPlugin
    //         client={this.props.client}
    //         routingKey={"1fb14df6-7f2a-44d7-b8d8-7f6cbdb91fc5"}
    //         uniqueClientID={this.props.clientID}
    //       />
    //     </div>
    //   );
    // }

    async loadPlugins(pluginNames) {
      const componentPromises = Object.entries(pluginNames).map(
        async ([pluginKey, pluginName]) => {
          console.log(pluginName);
          try {
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
          } catch (error) {
            console.log(error);
          }
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
