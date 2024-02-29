import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function LocationButton({
  routeObject,
  user,
  updater,
  deleter,
  deleterID,
}) {
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
    const ValidPostcodeRegex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g;

    const PostcodeIsValid = ValidPostcodeRegex.test(postcode);

    if (!PostcodeIsValid) {
      alert("Postcode format is invalid.");
      return;
    }

    const NewLocation = {
      name: name,
      postcode: postcode,
      id: routeObject.id,
      creator: user,
    };

    updater(deleterID, NewLocation);
    handleClose();
  };

  const handleDelete = () => {
    deleter(deleterID);
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
            <Button color="warning" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {user === routeObject.creator && (
            <Button onClick={handleSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
