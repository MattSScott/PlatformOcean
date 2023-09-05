import * as React from "react";
import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LocationButton from "./LocationButton";
import Stack from "@mui/material/Stack";
import Router from "./Router";

export default class Carpool extends PluginWrapper {
  constructor() {
    super();
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   TODO: get history of messages + convert to route buttons

  state = {
    addRouteFormOpen: false,
    locations: [],
    formDetails: {
      name: null,
      postcode: null,
    },
  };

  setFormName(setName) {
    this.setState((prevState) => ({
      ...prevState,
      formDetails: {
        ...prevState.formDetails,
        name: setName,
      },
    }));
  }

  setFormPostCode(setPostcode) {
    this.setState((prevState) => ({
      ...prevState,
      formDetails: {
        ...prevState.formDetails,
        postcode: setPostcode,
      },
    }));
  }

  handleClickOpen() {
    this.setState((prevState) => ({
      ...prevState,
      addRouteFormOpen: true,
    }));
  }

  handleClose() {
    this.setState((prevState) => ({
      ...prevState,
      addRouteFormOpen: false,
    }));
  }

  appendLocation(addedLocation) {
    this.setState((prevState) => ({
      ...prevState,
      locations: [...prevState.locations, addedLocation],
    }));
  }

  handleSubmit() {
    const ValidPostcodeRegex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g;

    const PostcodeIsValid = ValidPostcodeRegex.test(
      this.state.formDetails.postcode
    );

    if (!PostcodeIsValid) {
      alert("Postcode format is invalid.");
      return;
    }

    const FullRouteForm = {
      ...this.state.formDetails,
      creator: this.getUser(),
    };
    this.appendLocation(FullRouteForm);
    this.handleClose();
  }

  render() {
    return (
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ marginTop: "10px" }}>
          <Button variant="outlined" onClick={this.handleClickOpen}>
            Add Location
          </Button>
          <Dialog open={this.state.addRouteFormOpen} onClose={this.handleClose}>
            <DialogTitle>Add Location</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add yourself to this route, enter the relevant details below.
                These can be changed/removed at any time.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="route_form_name"
                label="Name"
                fullWidth
                variant="standard"
                onChange={(e) => this.setFormName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="route_form_postcode"
                label="Postcode"
                fullWidth
                variant="standard"
                onChange={(e) => this.setFormPostCode(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Stack direction="column" spacing={1}>
            {this.state.locations.map((locationObject) => (
              <LocationButton
                routeObject={locationObject}
                user={this.getUser()}
              />
            ))}
          </Stack>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Router locations={this.state.locations} />
        </div>
      </div>
    );
  }
}
