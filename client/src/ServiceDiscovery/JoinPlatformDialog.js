import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function JoinPlatformDialog({
  platformOwner,
  isOpen,
  handleClose,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minWidth: "300px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontWeight: "bold",
          fontSize: "1.8rem",
          textAlign: "center",
        }}
      >
        {platformOwner}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          You are not currently registered to this platform. Would you like to
          join?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minWidth: "300px",
          gap: "20px",
        }}
      >
        <Button
          sx={{
            width: "55px",
            height: "55px",
          }}
          onClick={() => handleClose(false)}
          color="error"
        >
          <CloseIcon
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Button>
        <Button
          sx={{
            width: "55px",
            height: "55px",
          }}
          onClick={() => handleClose(true)}
          color="success"
          autoFocus
        >
          <CheckIcon
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
