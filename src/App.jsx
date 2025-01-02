import TransactionPage from "./pages/TransactionPage";
import { SlidingBarProvider } from "./context/SlidingBarContext";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <>
      <SlidingBarProvider>
        <TransactionProvider>
          <TransactionPage />
        </TransactionProvider>
      </SlidingBarProvider>
    </>
  );
}

export default App;
