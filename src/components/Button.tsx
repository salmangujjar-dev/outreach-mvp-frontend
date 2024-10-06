import React, { MouseEventHandler } from "react";
import { clsxm } from "@utils/clsxm";

type Props = {
  title: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({ title, handleClick, className }: Props) => {
  return (
    <button
      onClick={handleClick}
      className={clsxm(
        className,
        "px-4 py-3 border-2 border-white cursor-pointer rounded-md hover:scale-105 ease-in-out duration-300 text-center uppercase"
      )}
    >
      {title}
    </button>
  );
};

export default Button;
