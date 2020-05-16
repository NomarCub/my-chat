import React, { Component } from "react";
import { proxy } from "./proxy";

export class Login extends Component {
  state = { email: "", password: "", displayName: "", register: false };
  onClick() {
    if (this.state.register)
      proxy.sendPacket({
        type: "register",
        email: this.state.email,
        password: this.state.password,
        displayName: this.state.displayName,
        staySignedIn: false,
      });
    else
      proxy.sendPacket({
        type: "login",
        email: this.state.email,
        password: this.state.password,
        staySignedIn: false,
      });
  }
  render() {
    return (
      <div className="login">
        <img src="logo512.png" width="256" />
        {this.state.register && (
          <input
            type="text"
            placeholder="Display Name (Agent Smith)"
            value={this.state.displayName}
            onChange={(e) => this.setState({ displayName: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email (someone@example.com)"
          value={this.state.email}
          onChange={(e) => {
            this.setState({ email: e.target.value });
            if (e.target.value === "TR2JRS")
              this.setState({ displayName: "Feri" });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button type="button" onClick={() => this.onClick()}>
          {this.state.register ? "Register" : "Login"}
        </button>
        <p>
          {this.state.register
            ? "Switch back to "
            : "Have no account yet? Go and "}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.setState((state: { register: boolean }) => ({
                register: !state.register,
              })); // pass a function instead of object
            }}
          >
            {this.state.register ? "Login" : "Register"}
          </a>
        </p>
        <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
      </div>
    );
  }
}
