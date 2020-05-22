import React from "react";
import { render } from "react-dom";

function Index() {
  return <p>Hi.</p>;
}

render(<Index />, document.getElementById("app"));
