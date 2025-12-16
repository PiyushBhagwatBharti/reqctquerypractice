import { useState } from "react";
import "./App.css";
import Posts from "../components/Posts";

async function createPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
  });
}

function App() {
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(false);

  async function handleSubmit(e){
      e.preventDefault();
  }

  return (
    <>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <button>submit</button>
      <button onClick={() => setToggle((p) => !p)}>toggle</button>
      {toggle && <Posts />}
    </>
  );
}

export default App;
