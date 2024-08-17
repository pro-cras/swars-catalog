import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "./components/main-page/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { categories } from "./api/api";
import { CategoryPage } from "./components/category-page/CategoryPage";
import { AppShell } from "./components/shell/AppShell";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  ...categories.map((category) => {
    return {
      path: `/${category}`,
      element: <CategoryPage />,
    };
  }),
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <RouterProvider router={router} />
      </AppShell>
    </QueryClientProvider>
  );
}

export default App;
