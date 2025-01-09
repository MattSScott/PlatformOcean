import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  // Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Registration.css";

// class Registration extends React.Component {
//   constructor(props) {
//     super(props);
//     this.setUsername = this.setUsername.bind(this);
//     this.setPassword = this.setPassword.bind(this);
//     this.submitSignup = this.submitSignup.bind(this);
//     this.submitLogin = this.submitLogin.bind(this);
//     this.loadUsers = this.loadUsers.bind(this);
//   }

//   static contextType = NetworkIPContext;

//   state = {
//     users: [],
//     formEntry: { username: null, password: null },
//   };

//   componentDidMount() {
//     this.loadUsers();
//     this.tryFindClient();
//   }

//   tryFindClient() {
//     const loggedInUser = localStorage.getItem("userID");
//     if (loggedInUser) {
//       this.props.setClientInfo(loggedInUser);
//     }
//   }

//   setUsername(event) {
//     this.setState((prevState) => ({
//       ...prevState,
//       formEntry: { ...prevState.formEntry, username: event.target.value },
//     }));
//   }

//   setPassword(event) {
//     this.setState((prevState) => ({
//       ...prevState,
//       formEntry: { ...prevState.formEntry, password: event.target.value },
//     }));
//   }

//   async loadUsers() {
//     const UserListAddress = `${this.context}/registry/getAll`;
//     try {
//       const UserData = await fetch(UserListAddress);
//       const UserJSON = await UserData.json();
//       this.setState((prevState) => ({ ...prevState, users: UserJSON }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async submitSignup(e) {
//     e.preventDefault();

//     try {
//       const numUsers = Object.keys(this.state.users).length;
//       let registrationAddress = `${this.context}/registry/`;
//       if (numUsers === 0) {
//         registrationAddress += "own";
//       } else {
//         registrationAddress += "add";
//       }
//       const response = await fetch(registrationAddress, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state.formEntry),
//       });
//       const UUID_Resp = await response.json();

//       this.props.setClientInfo(UUID_Resp);
//     } catch (error) {
//       console.log(error);
//       alert("Duplicate username entered.");
//     }
//   }

//   async submitLogin(e) {
//     e.preventDefault();
//     try {
//       const RegistrationAddress = `${this.context}/registry/get`;
//       const response = await fetch(RegistrationAddress, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state.formEntry),
//       });

//       const UUID_Resp = await response.json();

//       this.props.setClientInfo(UUID_Resp);
//     } catch (error) {
//       console.log(error);
//       alert("Username or password is incorrect.");
//     }
//   }

//   render() {
//     return (
//       <div>
//         <div className="inputHouse">
//           <TextField
//             className="inputButton"
//             id="outlined-basic"
//             label="Username"
//             variant="outlined"
//             onChange={this.setUsername}
//           />
//           <TextField
//             className="inputButton"
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//             onChange={this.setPassword}
//           />
//         </div>
//         <div className="buttonHouse">
//           <Button variant="contained" onClick={this.submitSignup}>
//             SignUp
//           </Button>
//           <Button variant="contained" onClick={this.submitLogin}>
//             Login
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Registration;

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
          autoCapitalize="off"
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
          // marginTop: "10px",
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
