import React, { Component } from "react";
import { Login } from "./Login";
import "./proxy";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Login />
      </div>
    );
  }
}
