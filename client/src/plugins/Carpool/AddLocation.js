import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddLocation({ appendLocation }) {
  const [formName, setFormName] = useState(null);
  const [formPostcode, setFormPostCode] = useState(null);
  const [addRouteFormOpen, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const ValidPostcodeRegex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g;

    const PostcodeIsValid = ValidPostcodeRegex.test(formPostcode);

    if (!PostcodeIsValid) {
      alert("Postcode format is invalid.");
      return;
    }

    appendLocation({ name: formName, postcode: formPostcode });
    handleClose();
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Button
        variant="outlined"
        style={{ width: "150px" }}
        onClick={handleClickOpen}
      >
        Add Location
      </Button>
      <Dialog open={addRouteFormOpen} onClose={handleClose}>
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
            onChange={(e) => setFormName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="route_form_postcode"
            label="Postcode"
            fullWidth
            variant="standard"
            onChange={(e) => setFormPostCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
