import { NextUIProvider } from "@nextui-org/react";
import { Slide, ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={true}
        theme="dark"
        transition={Slide}
      />
      {children}
    </NextUIProvider>
  );
}
