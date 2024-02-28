import * as React from "react";
import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import AddLocation from "./AddLocation";
import LocationButton from "./LocationButton";
import Stack from "@mui/material/Stack";
import Router from "./Router";

export default class Carpool extends PluginWrapper {
  constructor() {
    super();
    this.appendLocation = this.appendLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  appendLocation(addedLocation) {
    const FullLocation = {
      ...addedLocation,
      creator: this.getUser(),
    };

    this.sendDataToBackend(FullLocation, true);
  }

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
          <Stack
            direction="column"
            spacing={0.5}
            style={{ maxHeight: 80, overflow: "auto" }}
          >
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
