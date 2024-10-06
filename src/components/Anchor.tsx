import React from "react";
import { clsxm } from "@utils/clsxm";

type Props = {
  title: string;
  target: string;
  className?: string;
};

const Anchor = ({ title, target, className }: Props) => {
  return (
    <a
      href={target}
      className={clsxm(
        className,
        "px-4 py-3 border-2 border-white cursor-pointer rounded-md hover:scale-105 ease-in-out duration-300 text-center uppercase"
      )}
    >
      {title}
    </a>
  );
};

export default Anchor;
