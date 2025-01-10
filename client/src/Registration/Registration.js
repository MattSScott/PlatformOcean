import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Registration({ setUserDetails }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  useEffect(() => {
    const tryFindClient = () => {
      const userDetails = localStorage.getItem("userData");
      console.log(userDetails);
      if (userDetails) {
        setUserDetails(JSON.parse(userDetails));
      }
    };
    tryFindClient();
  }, [setUserDetails]);

  const submitDetails = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Both username and password are required.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setError("");
    const formEntry = {
      username: trimmedUsername,
      password: trimmedPassword,
    };
    localStorage.setItem("userData", JSON.stringify(formEntry));
    setUserDetails(formEntry);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          sx={{
            marginBottom: "10px",
            "& .MuiInputBase-root": {
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              padding: { xs: "8px", sm: "10px", md: "12px" },
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            },
          }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          autoCapitalize="none"
          sx={{
            marginTop: "10px",
            "& .MuiInputBase-root": {
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              padding: { xs: "8px", sm: "10px", md: "12px" },
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            },
          }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {error && (
        <Typography color="error" variant="h6" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            marginTop: "16px",
            width: "100%",
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            padding: { xs: "10px 20px", sm: "12px 24px", md: "14px 28px" },
          }}
          variant="contained"
          onClick={submitDetails}
        >
          <LoginIcon sx={{ marginRight: "10px" }} />
          Log In
        </Button>
      </div>
    </div>
  );
}
