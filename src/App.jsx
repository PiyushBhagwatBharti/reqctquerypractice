import { useState } from "react";
import Posts from "../components/Posts";
import Form from "../components/Form";


function App() {
  const [toggle, setToggle] = useState(false);
  

  return (
    <>
      <Form />
      <button onClick={() => setToggle((p) => !p)}>toggle</button>
      {toggle && <Posts />}
    </>
  );
}

export default App;
