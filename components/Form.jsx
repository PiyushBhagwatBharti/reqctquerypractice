import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, FormikProvider, useFormik } from "formik";
import React from "react";

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

const Form = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onMutate: (newPost) => {
      queryClient.cancelQueries(["posts"]);
      const prevPosts = queryClient.getQueryData(["posts"]); //save the previous state for error handeling
      queryClient.setQueryData(["posts"], (old) => [
        ...old,
        { ...newPost, id: Date.now() },
      ]);

      return { prevPosts }; //return pre state for the same reason
    },

    onError: (er, newPost, context) => {
      queryClient.setQueryData(["posts"], context.prevPosts);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: (val) => {
      alert(JSON.stringify(val));
      mutate(val);
    },
  });

  return (
    <form
      className="flex flex-col bg-neutral-200 w-fit p-2 items-center rounded-2xl gap-2"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-full flex flex-col items-start gap-2">
        <input
        className="w-full"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        <textarea
          name="body"
          rows={4}
          cols={30}
          placeholder="blog body"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
      </div>
      <button
        className="px-6 py-1 hover:bg-blue-500 hover:text-white active:bg-neutral-300 cursor-pointer transition-all hover:shadow-sm duration-100 rounded-full"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
