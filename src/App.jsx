import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
