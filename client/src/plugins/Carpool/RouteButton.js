import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function RouteButton({ routeObject, user }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(routeObject.name);
  const [postcode, setPostcode] = useState(routeObject.postcode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    routeObject.name = name;
    routeObject.postcode = postcode;
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {routeObject.name}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="route_form_name"
            label="Name"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="route_form_postcode"
            label="Postcode"
            fullWidth
            variant="standard"
            defaultValue={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {user === routeObject.creator && (
            <Button onClick={handleSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
