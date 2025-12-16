import { useQuery } from "@tanstack/react-query";
import React from "react";

const Posts = () => {
  async function fetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      console.log("Er: cant fetch");
      throw new Error("Fetching Failed");
    }

    return await res.json();
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    retry: 2,
    staleTime: 5000 //will refetch only f previous fetch time was before 5sec;
  });


  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching...</p>;

  return (
    <>
      {data?.map((d) => {
        return <p key={d.id}>{d.title}</p>;
      })}
    </>
  );
};

export default Posts;
