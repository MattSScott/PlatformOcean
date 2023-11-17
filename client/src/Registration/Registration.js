import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Registration.css";
import { NetworkIPContext } from "../Contexts/ServerIPContext";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }

  static contextType = NetworkIPContext;

  state = {
    users: [],
    formEntry: { username: null, password: null },
  };

  componentDidMount() {
    this.loadUsers();
    this.tryFindClient();
  }

  tryFindClient() {
    const loggedInUser = localStorage.getItem("userID");
    if (loggedInUser) {
      this.props.setClientInfo(loggedInUser);
    }
  }

  setUsername(event) {
    this.setState((prevState) => ({
      ...prevState,
      formEntry: { ...prevState.formEntry, username: event.target.value },
    }));
  }

  setPassword(event) {
    this.setState((prevState) => ({
      ...prevState,
      formEntry: { ...prevState.formEntry, password: event.target.value },
    }));
  }

  async loadUsers() {
    const UserListAddress = `${this.context}/registry/getAll`;
    try {
      const UserData = await fetch(UserListAddress);
      const UserJSON = await UserData.json();
      this.setState((prevState) => ({ ...prevState, users: UserJSON }));
    } catch (error) {
      console.log(error);
    }
  }

  async submitSignup(e) {
    e.preventDefault();

    try {
      const numUsers = Object.keys(this.state.users).length;
      let registrationAddress = `${this.context}/registry/`;
      if (numUsers === 0) {
        registrationAddress += "own";
      } else {
        registrationAddress += "add";
      }
      const response = await fetch(registrationAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formEntry),
      });
      const UUID_Resp = await response.json();

      this.props.setClientInfo(UUID_Resp);
    } catch (error) {
      console.log(error);
      alert("Duplicate username entered.");
    }
  }

  async submitLogin(e) {
    e.preventDefault();

    try {
      const RegistrationAddress = `${this.context}/registry/get`;
      const response = await fetch(RegistrationAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formEntry),
      });

      const UUID_Resp = await response.json();

      this.props.setClientInfo(UUID_Resp);
    } catch (error) {
      console.log(error);
      alert("Username or password is incorrect.");
    }
  }

  render() {
    return (
      <div>
        <div className="inputHouse">
          <TextField
            className="inputButton"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={this.setUsername}
          />
          <TextField
            className="inputButton"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={this.setPassword}
          />
        </div>
        <div className="buttonHouse">
          <Button variant="contained" onClick={this.submitSignup}>
            SignUp
          </Button>
          <Button variant="contained" onClick={this.submitLogin}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Registration;
