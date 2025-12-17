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
    staleTime: 5000, //will refetch only f previous fetch time was before 5sec;
  });

  if (isLoading) return <p className="px-6 py-1 bg-blue-200 inline cursor-pointer transition-all  duration-100 rounded-full">Loading...</p>;

  if (isError) return <p>Error fetching...</p>;

  return (
    <div className="grid grid-cols-4 gap-2">
      {data?.map((d) => {
        return (
          <div className="bg-blue-200 max-w-sm rounded-lg p-1">
            <h2 className="text-sm font-bold mb-1" key={d.id}>{d.title}</h2>
            <p>{d.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
