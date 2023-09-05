import { Toaster } from "react-hot-toast";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
