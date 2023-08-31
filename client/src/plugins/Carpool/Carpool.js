import * as React from "react";
import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RouteButton from "./RouteButton";
import Stack from "@mui/material/Stack";

export default class Carpool extends PluginWrapper {
  constructor() {
    super();
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    addRouteFormOpen: false,
    createdRoutes: [],
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

  appendRoute(addedRoute) {
    const NewRoute = <RouteButton routeObject={addedRoute} />;
    this.setState((prevState) => ({
      ...prevState,
      createdRoutes: [...prevState.createdRoutes, NewRoute],
    }));
  }

  handleSubmit() {
    console.log(this.state.formDetails);
    this.appendRoute(this.state.formDetails);
    this.handleClose();
  }

  render() {
    return (
      <div style={{ "margin-left": "20px", "margin-right": "20px" }}>
        <div style={{ "margin-top": "10px" }}>
          <Button variant="outlined" onClick={this.handleClickOpen}>
            Add Route
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
        <div style={{ "margin-top": "10px" }}>
          <Stack direction="column" spacing={1}>
            {this.state.createdRoutes.map((Route) => Route)}
          </Stack>
        </div>
      </div>
    );
  }
}
