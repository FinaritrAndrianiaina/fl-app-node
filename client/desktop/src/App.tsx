import { Fragment, useState } from "react";
import { Navbar } from "./Navbar";

function App() {
  const [counts, setCount] = useState(0);

  return (
    <Fragment>
      <Navbar />
      <p>Test </p>
      <button className={"btn btn-primary"}>Salut</button>
    </Fragment>
  );
}

export default App;
