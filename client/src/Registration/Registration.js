import React from "react";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }

  state = {
    users: [],
    formEntry: { username: null, password: null },
  };

  componentDidMount() {
    this.loadUsers();
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
    const UserListAddress = "http://localhost:8080/registry/getAll";
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
      let registrationAddress = "http://localhost:8080/registry/";
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
      const RegistrationAddress = "http://localhost:8080/registry/get";
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
        <p>Username:</p>
        <form>
          <input type="text" onChange={this.setUsername} />
        </form>
        <p>Password:</p>
        <form>
          <input type="text" onChange={this.setPassword} />
        </form>
        <button onClick={this.submitSignup}>Submit</button>
        <button onClick={this.submitLogin}>Login</button>
      </div>
    );
  }
}

export default Registration;
