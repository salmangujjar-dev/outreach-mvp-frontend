import React from "react";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className="absolute left-10 top-10 z-50 rounded-full border-2 text-indigo-500 font-bold p-3 border-indigo-500 w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105"
    >
      {"<"}
    </button>
  );
};

export default GoBack;
