import { useState } from "react";
import Posts from "../components/Posts";
import Form from "../components/Form";


function App() {
  const [toggle, setToggle] = useState(false);
  

  return (
    <>
      <Form />
      <button className="px-6 py-1 hover:bg-blue-200 active:bg-blue-300 cursor-pointer transition-all hover:shadow-sm duration-100 rounded-full" onClick={() => setToggle((p) => !p)}>Get Posts</button>
      {toggle && <Posts />}
    </>
  );
}

export default App;
