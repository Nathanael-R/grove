import Leaderboard from "../components/Leaderboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Leaderboard />
      </>
    </QueryClientProvider>
  );
};

export default App;
