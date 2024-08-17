import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "./main-page/MainPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
