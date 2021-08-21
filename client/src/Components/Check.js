import React from "react";
import { Redirect } from "react-router-dom";

function Check({ isAuth }) {
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default Check;
