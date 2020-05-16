import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <img src="logo512.png" width="256" />
        <input type="email" placeholder="Email (someone@example.com)" />
        <input type="password" placeholder="Password" />
        <button type="button">Login</button>
        <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
      </div>
    );
  }
}
