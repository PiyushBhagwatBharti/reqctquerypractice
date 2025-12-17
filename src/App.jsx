import { useState } from "react";
import "./App.css";
import Posts from "../components/Posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createPost(newPost) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: newPost,
  });
  if (!res.ok) {
    console.log("Error in posting");
    throw new Error("error in posting");
  }
  return await res.json();
}

function App() {
  const [title, setTitle] = useState("");
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["posts"]);
    // },
    onMutate: (newPost) => {
      queryClient.cancelQueries(["posts"]);
      queryClient.setQueryData(["posts"], (old) => [
        ...old,
        { ...newPost, id: Date.now() },
      ]);
      const prevPosts = queryClient.getQueryData(["posts"]);

      return prevPosts;
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    mutate({ title, body: "This is body" });
  }

  return (
    <>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSubmit}>submit</button>
      <button onClick={() => setToggle((p) => !p)}>toggle</button>
      {toggle && <Posts />}
    </>
  );
}

export default App;
