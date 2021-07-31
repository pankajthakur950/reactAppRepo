import React from 'react';

import Login from "components/Login/Login";
import Signup from "components/Login/Signup";

import "pages/login/login.scss";

export default function LoginPage() {
  return (
    <div className="login-page">
        <Login/>
        <Signup/>
    </div>
  )
}
