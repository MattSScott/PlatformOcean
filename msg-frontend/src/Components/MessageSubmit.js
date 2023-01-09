import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function MessageSubmit() {
  const [message, setMessage] = useState({ sender: "", message: "" });

  async function postMessage(event) {
    event.preventDefault();
    try {
      const status = await fetch("http://localhost:8080/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Sender"
          variant="outlined"
          onChange={(e) => setMessage({ ...message, sender: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          onChange={(e) => setMessage({ ...message, message: e.target.value })}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: 200, marginTop: "10px" }}
        onClick={postMessage}
      >
        Submit
      </Button>
    </div>
  );
}
