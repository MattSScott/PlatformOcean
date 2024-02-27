import * as React from "react";
import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import AddLocation from "./AddLocation";
import LocationButton from "./LocationButton";
import Stack from "@mui/material/Stack";
import Router from "./Router";
import { v4 as uuidv4 } from "uuid";

export default class Carpool extends PluginWrapper {
  constructor() {
    super();
    this.appendLocation = this.appendLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  //   TODO: get history of messages + convert to route buttons

  state = {
    locations: [],
  };

  appendLocation(addedLocation) {
    const FullLocation = {
      ...addedLocation,
      creator: this.getUser(),
    };

    this.sendDataToBackend(FullLocation, true);
  }

  // appendLocation(addedLocation) {
  //   const FullLocation = {
  //     ...addedLocation,
  //     creator: this.getUser(),
  //     id: uuidv4(),
  //   };

  //   this.setState((prevState) => ({
  //     ...prevState,
  //     locations: [...prevState.locations, FullLocation],
  //   }));
  // }

  removeLocation(removalLocation) {
    this.setState((prevState) => ({
      ...prevState,
      locations: prevState.locations.filter(
        (loc) => loc.id !== removalLocation.id
      ),
    }));
  }

  updateLocation(updatedLocation) {
    this.setState((prevState) => ({
      ...prevState,
      locations: prevState.locations.map((loc) => {
        if (loc.id === updatedLocation.id) {
          return updatedLocation;
        }
        return loc;
      }),
    }));
  }

  render() {
    return (
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <AddLocation appendLocation={this.appendLocation} />
        <div style={{ marginTop: "10px" }}>
          <Stack direction="column" spacing={1}>
            {this.getDataHistory().map((locationObject, idx) => (
              <LocationButton
                routeObject={locationObject.message}
                user={this.getUser()}
                updater={this.updateLocation}
                deleter={this.removeLocation}
                key={`location-button-${idx}`}
              />
            ))}
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Router locations={this.getDataHistory()} />
        </div>
      </div>
    );
  }
}
