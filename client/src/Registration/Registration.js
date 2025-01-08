import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
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
  const [formEntry, setFormEntry] = useState({
    username: null,
    password: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  useEffect(() => {
    const tryFindClient = () => {
      const userDetails = localStorage.getItem("userData");
      console.log(userDetails);
      if (userDetails) {
        setUserDetails(userDetails);
      }
    };
    tryFindClient();
  }, []);

  const setUsername = (e) => {
    setFormEntry((prevState) => ({
      ...prevState,
      username: e.target.value,
    }));
  };

  const setPassword = (e) => {
    setFormEntry((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const submitDetails = () => {
    localStorage.setItem("userData", formEntry);
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
          onChange={setUsername}
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
          onChange={setPassword}
          // InputLabelProps={{
          //   sx: {
          //     top: "50%",
          //     transform: "translateY(-50%)",
          //     marginLeft: "10px",
          //   },
          // }}
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
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            marginTop: "16px",
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            padding: { xs: "10px 20px", sm: "12px 24px", md: "14px 28px" },
          }}
          variant="contained"
          onClick={submitDetails}
        >
          Bind Login Details
        </Button>
      </div>
    </div>
  );
}
